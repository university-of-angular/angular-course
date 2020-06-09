# Angular Attribute Decorator
The **@Attribute** decorator is one of the least known and least used, but in some cases, it can bring a performance boost to the application.
The **@Attribute** decorator returns the value of the specified attribute from the host. It's useful, for example, when you don't need to use *Inputs()* and you don't want Angular to recheck the value in each change detection cycle. With **@Attribute** you are getting the value once and you are done.
#### Ej.:
```
...
constructor(private coursesService: CoursesService,
            @Attribute('type') private type: string) {
    ....            
}
```