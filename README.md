## Angular DI - Understanding Simplified Provider Configuration

### Configuring Injectors
The **NgModule** decorator has a property called **providers** which accepts a list of providers exactly the same as we would pass to the **ReflectiveInjector** via the **resolveAndCreate** function we looked at previously, like so:

```
@NgModule({
  providers: [EmailService, JobService]
})
class AppModule { }
```

This creates a top-level parent injector and configures it with two class providers, **EmailService** and **JobService**.

We can also configure our Components and Directives the same way using a property called **providers** on the **Component** and **Directive** decorators, like so:

```
@Component({
  selector: 'my-comp',
  template: `...`,
  providers: [EmailService]
})
```

This creates a child injector who’s parent injector is the injector on the parent component. If there is no parent component then the parent injector is the top-level **NgModule** injector.

With components we have another property called **viewProviders** which creates a special injector that resolves dependencies only for this component’s view children and doesn’t act as a parent injector for any content children, like so:

```
@Component({
  selector: 'my-comp',
  template: `...`,
  viewProviders: [EmailService]
})
```

* We configure these injectors with providers by adding the configuration to either the **providers** property on 
  the **NgModule**, **Component** and **Directive** decorators or to the **viewProviders** property on the **Component** decorator.

* We use the **@Inject** parameter decorator to instruct Angular we want to resolve a token and inject a 
  dependency into a constructor.
  #### Ej.:
  ``` 
  import { Inject } from '@angular/core';
  .
  .
  .
  class SimpleService {
    otherService: OtherService;

    constructor(@Inject(OtherService) otherService: OtherService) {
        this.otherService = otherService;
    };
  }
  ```

* We use the **@Injectable** class decorators to automatically resolve and inject all the parameters of class 
  constructor.

* We don’t need to use the **@Injectable** class decorator on classes which are already decorated with one of the 
  other Angular decorators, such as **@Component**.

# Tip
If we want to share one instance of a service across the entirety of our application we configure it on our **NgModule**.

# Tip
If we want to have one instance of a service per component, and shared with all the component’s children, we configure it on the **providers** property on our component decorator.

# Tip
If we want to have one instance of a service per component, and shared with only the component’s view children and not the component’s content children, we configure it on the **viewProviders** property of our component decorator.

# Tip
We cannot use an interface as **InjectionToken**.
**WE CANNOT** write our **manual provider function**. The reason? Angular uses internally the class name as the unique identifier for the **@Injectable**.