# Angular Custom Change Detection with ChangeDetectorRef
It serves to inform Angular manually for the change detection whenever arrives some data, without using Observables and the async pipe, or without using @Input().
Every component has its own **ChangeDetectorRef**.
Using the **markForCheck()** method from **ChangeDetectorRef**, we inform Angular that the component should be check for changing.
#### Ej.:
```
...
constructor(private coursesService: CoursesService,
            private cd: ChangeDetectorRef) {

}
...

ngOnInit() {
    this.coursesService.loadCourses().subscribe(courses =>{
        this.courses = courses;
        this.cd.markForCheck();
    });
}
```