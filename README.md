# OnPush Change Detection
We can set the **ChangeDetectionStrategy** of our component to **ChangeDetectionStrategy.OnPush**.
This tells Angular that the component only depends on its **@inputs()** ( aka pure ) and needs to be checked only in the following cases:
## 1) The **Input** reference changes.
   By setting the onPush change detection strategy we are signing a contract with Angular that obliges us to work with immutable objects (or observables as we’ll see later).
   The advantage of working with immutability in the context of change detection is that Angular could perform a simple reference check in order to know if the view should be checked. Such checks are way cheaper than a deep comparison check.
   #### Ej.:
   #### on-push-2.ts
   ```
    @Component({
      selector: 'tooltip',
      template: `
        <h1>{{config.position}}</h1>
        {{runChangeDetection}}
      `,
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class TooltipComponent  {

      @Input() config;

      get runChangeDetection() {
        console.log('Checking the view');
        return true;
      }
    }
  ```
  #### on-push-3.ts
  ```
    @Component({
      template: `
        <tooltip [config]="config"></tooltip>
      `
    })
    export class AppComponent  {
      config = {
        position: 'top'
      };

      onClick() {
        this.config.position = 'bottom';
      }
    }
   ```
When we click on the button we will not see any log. That’s because Angular is comparing the old value with the new value by reference, something like:
```
/** Returns false in our case */
if( oldValue !== newValue ) { 
  runChangeDetection();
}
```

So in order to trigger a change detection in our component, we need to change the object reference.

#### on-push-4.ts
```
@Component({
  template: `
    <tooltip [config]="config"></tooltip>
  `
})
export class AppComponent  {
  config = {
    position: 'top'
  };

  onClick() {
    this.config = {
      position: 'bottom'
    }
  }
}
```
With this change we will see that the view has been checked and the new value is displayed as expected.

## 2) An event originated from the component or one of its children.
   A component could have an internal state that’s updated when an event is triggered from the component or one of his children.
   #### Ej.:
   #### on-push-5.ts
   ```
    @Component({
      template: `
        <button (click)="add()">Add</button>
        {{count}}
      `,
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class CounterComponent {
      count = 0;

      add() {
        this.count++;
      }

    }
   ``` 
   When we click on the button, Angular runs a change detection cycle and the view is updated as expected. It turns out that the rule applies only to DOM events, so the following APIs will not work.
   #### on-push-5.ts
   ```
    @Component({
      template: `...`,
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class CounterComponent {
      count = 0;

      constructor() {
        setTimeout(() => this.count = 5, 0);

        setInterval(() => this.count = 5, 100);

        Promise.resolve().then(() => this.count = 5); 
        
        this.http.get('https://count.com').subscribe(res => {
          this.count = res;
        });
      }

      add() {
        this.count++;
      }

    }   
   ```
   Note that you are still updating the property so in the next change detection cycle, for example, when we click on the button, the value will be six ( 5 + 1 ).

## 3) We run change detection explicitly.   
   Angular provides us with three methods for triggering change detection ourselves when needed.
   The first is **detectChanges()** which tells Angular to run change detection on the component and his children.
   #### on-push-9.ts
   ```
    @Component({
      selector: 'counter',
      template: `{{count}}`,
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class CounterComponent { 
      count = 0;

      constructor(private cdr: ChangeDetectorRef) {

        setTimeout(() => {
          this.count = 5;
          this.cdr.detectChanges();
        }, 1000);

      }

    }   
   ```
   The second is ApplicationRef.tick() which tells Angular to run change detection for the whole application.
   #### on-push-7.ts
   ```
    tick() {
    
      try {
        this._views.forEach((view) => view.detectChanges());
        ...
      } catch (e) {
        ...
      }
    }   
   ```
   The third is markForCheck() which does NOT trigger change detection. Instead, it marks all onPush ancestors as to be checked once, either as part of the current or next change detection cycle.
   #### on-push-8.ts
   ```
    markForCheck(): void { 
      markParentViewsForCheck(this._view); 
    }

    export function markParentViewsForCheck(view: ViewData) {
      let currView: ViewData|null = view;
      while (currView) {
        if (currView.def.flags & ViewFlags.OnPush) {
          currView.state |= ViewState.ChecksEnabled;
        }
        currView = currView.viewContainerParent || currView.parent;
      }
    }  
   ```   