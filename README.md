# OnPush Change Detection and Observables Data Streams
The async pipe subscribes to an observable or promise and returns the latest value it has emitted.
Let’s see a trivial example of an onPush component with an input() observable.
#### on-push-10.ts
```
@Component({
  template: `
    <button (click)="add()">Add</button>
    <app-list [items$]="items$"></app-list>
  `
})
export class AppComponent {
  items = [];
  items$ = new BehaviorSubject(this.items);

  add() {
    this.items.push({ title: Math.random() })
    this.items$.next(this.items);
  }
}
```

#### on-push-11.ts
```
@Component({
  template: `
     <div *ngFor="let item of items">{{item.title}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() items: Observable<Item>;
  _items: Item[];
  
  ngOnInit() {
    this.items.subscribe(items => {
      this._items = items;
    });
  }

}
```

When we click on the button we are not going to see the view updated. This is because none of the conditions mentioned above occurred, so Angular will not check the component at the current change detection cycle.
Now, let’s change it to use the **async** pipe.
#### on-push-12.ts
```
@Component({
  template: `
    <div *ngFor="let item of items | async">{{item.title}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() items;
}
```
Now we can see that the view is updated when we click on the button. The reason for that is that when a new value is emitted, the async pipe marks the component to be checked for changes.