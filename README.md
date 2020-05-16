
##  Angular Custom Services - The Injectable Decorator

To define a class as a service in Angular, use the **@Injectable()** decorator to provide the metadata that allows Angular to inject it into a component as a dependency. Similarly, use the **@Injectable()** decorator to indicate that a component or other class (such as another service, a pipe, or an NgModule) has a dependency.

* The *injector* is the main mechanism. Angular creates an application-wide injector for you during 
  the bootstrap process, and additional injectors as needed. You don't have to create injectors.

* An injector creates dependencies, and maintains a container of dependency instances that it reuses 
  if possible.

* A *provider* is an object that tells an injector how to obtain or create a dependency.

For any dependency that you need in your app, <u>**you must register a provider with the app's injector**</u>, so that the injector can use the provider to create new instances. For a service, the provider is typically the service class itself.

With the parameter ``` providedIn: 'root.``` in the ``` @Injectable()``` decorator we are sharing one service instance (singleton) for the whole application. 