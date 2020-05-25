## Understanding Angular Tree-Shakeable Providers (TSP)
Tree Shakeable Providers are a way to define services and other things to be used by Angular’s dependency injection system in a way that can improve the performance of an Angular application.
Tree shaking is a step in a build process that removes unused code from a code base. Removing unused code can be thought as “tree shaking,” or you can visualize the physical shaking of a tree and the remaining dead leaves falling off of the tree. By using tree shaking, we can make sure our application only includes the code that is needed for our application to run.
The way to use TSP is through the @Injectable() decorator for our services.
#### Ej.:
```
@Injectable({
  providedIn: 'root',
})
```
In this case, **providedIn: 'root'** specifies that Angular should provide the service in the root injector.
Instead, if we want to specify that our service should be provided in an specific module, its name will substitute the *'root'* value of **providedIn**.
```
import { Injectable } from '@angular/core';
import { UserModule } from './user.module';

@Injectable({
  providedIn: UserModule,
})
export class UserService {
}
```
This method is preferred because it enables tree-shaking of the service if nothing inject.

We can use a provider function at the service level too:
```
@Injectable({
  providedIn: 'root',
  useFactory: (http) => new CoursesService(http), // or we can use 'useClass' instead, and omit 'deps' array too
                                                  // useClass: CoursesService
  deps: [HttpClient]
})
export class CoursesService {
  ....
}
```
Here, we're manually defining a provider function for our service dependencies.

# Tip
With TSP we can omit the *providers* array in our components.

# Tip
We have to use the providers array at the component level, just if the service has an state that is specific to the component, an state that we only want to have visible at the level of the component.
Otherwise, we can use TSP (for singleton services).