# Angular Lifecycle Hooks - OnInit and OnDestroy

## OnInit
As the name implies, this event declares that Angular is **ready to create the component**. This phase occurs immediately after the first OnChanges and is performed only once.
Which means that all injected dependencies will be resolved and all class members will be defined. this makes it the perfect place to perform any component initialization / logic.
Angular calls it shortly after checking the input properties for that component or directive for the first time.
It's called once, after the first **ngOnChanges()**.

## OnDestroy
This is the last phase of the component, which occurs **just before Angular destroys it**. This, like OnInit, is also done only once.
It is mainly used to clean up the component such as:

1. Stop the interval timers.
2. Launch the unsubscribe to Observable objects.
3. Launch unsubscribe to all calls.

Here is an example:
```
import { Component, OnInit, OnDestroy, DoCheck} from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DetailliveComponent implements OnDestroy {

 demoInterval = null

 constructor() {
  this.demoInterval = setInterval(function(){ alert("Hello"); }, 3000);
 }

 ngOnDestroy() {
   clearInterval(this.demoInterval);
 }

}
```