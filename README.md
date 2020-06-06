# Angular Change Detection: Default vs. OnPush
Change detection can be defined as synchronizing process of model and view. There are two types of change detection methods in Angular. This can be specified in the declaration of component like below.
```
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

If you do not specify, Angular will apply the default change detection method which detects changes for entire components whenever changes are made. During the runtime, every component gets the change detection class inside it, Angular traverses the application hierarchy from top to bottom components, if there is change, it updates DOM and renders the corresponding view.

* If a component is set as OnPush, it does not affected by Angular’s default change detection. All the components 
  under the component 3 in context of hierarchical components tree are not affected. Otherwiser, the component is rendered as the model changes.

#### Ej.:
#### Component 1
```
@Component({
  selector: 'app-root',
  template: `
  <div>
    <h1>{{ title }}</h1>
    <input #word type="text">
    <button (click)="addWord(word.value)">Add a favorite word</button>
    <app2 [data]="words"></app2>
    <app3 [data]="words"></app3>
  </div>
  `,
  styles: ['div { background: #ECECEB; border: 2px dotted silver;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Component 1';
  words = ['Sugar', 'Latte', 'Chocolate'];

  addWord(word): void {
    this.words.push(word);
  }
}
```

#### Component 3
```
@Component({
  selector: 'app3',
  template: `
  <div>
    <h1>{{ title }} (ChangeDetectionStrategy.OnPush)</h1>
    <ul>
      <li *ngFor="let item of data">{{ item }}</li>
    </ul>
  </div>
  `,
  styles: ['div { background: #ECECEB; border: 2px dotted silver;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App3Component {
  title = 'Component 3';
}
```