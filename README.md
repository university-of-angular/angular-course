##  Angular DI - Understanding Providers and Injection Tokens

### Injection tokens
Injection tokens are a feature of Angular that allows the injection of values that don't have a runtime representation. What we mean by this, is that you can't inject something like an interface as it only exists as a TypeScript construct, not JavaScript. Injection tokens provide a simple mechanism to link a token, to a value, and have that value injected into a component.

#### Ej.:
```
import { InjectionToken } from '@angular/core'

export const MY_TOKEN = new InjectionToken<string>('MyToken');
```

Given that token, we can define a provider:

```
@NgModule({
  providers: [
    { provide: MY_TOKEN, useValue: 'Hello world' }
  ]
})
export class AppModule { }
```

Which, in turn allows you to inject the value into your component:

```
@Component({
  selector: 'my-component',
  template: '<h1>{{ value }}</h1>'
})
export class MyComponent {
  constructor(@Inject(MY_TOKEN) public value: string) { }
}
```

Injection tokens become a secret to Angular extensibility. Let's look at an extended example, let's say a dynamic menu system:
```
export interface MenuItem {
  label: string;
  route: any[];
}
```

We could define an injection token based on our interface:
```
export const SETTINGS_MENU = new InjectionToken<MenuItem>('Settings');
```

Imagine if you will, in many modules, we could define menu items:
```
const moduleOneMenu: MenuItem = {
  label: 'Module one',
  route: ['/module-one']
};

@NgModule({
  providers: [
    { provide: SETTINGS_MENU, useValue: moduleOneMenu, multi: true }
  ]
})
export class ModuleOne { }
```

And perhaps also:
```
const moduleTwoMenu: MenuItem = {
  label: 'Module two',
  route: ['/module-two']
};

@NgModule({
  providers: [
    { provide: SETTINGS_MENU, useValue: moduleTwoMenu, multi: true }
  ]
})
export class ModuleTwo { }
```

Using the multi property, this allows us to inject many items into our component:
```
@Component({
  selector: 'my-menu',
  template: `
    <ul>
      <li *ngFor="let item of items">
        <a [routeLink]="item.route">{{ item.label }}</a>
      </li>
    </ul>`
})
export class MenuComponent {
  constructor(@Inject(SETTINGS_MENU) public items: MenuItem[]) { }
}
```

Injection tokens are a powerful feature of Angular that allows us to compose applications in variety of extensible ways.