# Angular DI Decorators - Optional, Self, SkipSelf
* The **@Optional** property decorator tells Angular to return null when it can't find the dependency. In such case 
  of no provider found, no error will occur. Instead Angular will set the value for our service to **null**.
* Using the **@Self** decorator, the injector only looks at the component's injector for its providers. The only 
  place allowed to find the injector is the component itself.
* The **SkipSelf** decorator allows you to skip the local injector and look up in the hierarchy to find a provider 
  that satisfies this dependency