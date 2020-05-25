## Understanding Hierarchical Dependency Injection

It serves to limit the provider scope. Component providers and NgModule providers are independent each other.
* You can provide a service in the component's *providers* array when you want to eagerly load a module that needs a 
  service all to itself. Providing a service in the component limits the service only to that component and its descendants. Other components in the same module can't access it.
  The services provided at component level are linked to the component lifecycle. When the component is destroyed, those services instances are also removed from memory.
  ``` 
  @Component({
  /* . . . */
    providers: [UserService]
  })
  ```

* The services that the whole app needs are provided in the root module