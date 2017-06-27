# ng-custom-title
WIP - Angular custom titles by @CrossEngage :)

### How to use it


#### Installation

first you need install the 
```
...
```

#### Usage

##### Angular

Then you need inject the Custom Title to your `app.module`

```
import { NgCustomTitleModule } from '...path-to-module';

@NgModule({
  imports: [NgCustomTitleModule],
  providers: []
})

export class AppModule {
  ngDoBootstrap() {}
}
```

On your Angular Component you can add a value to be rendered and be editable ;)

```
import { Component } from '@angular/core';

@Component({
  selector: 'my-component',
  template: '...'
})

export class myComponent {
  myEditableTitle: string = 'Hi Guys!';

}
```

After that you need call the editable title component with one simple component declaration on HTML like:

```
  <ng-custom-title
    [title]="myEditableTitle"
    [placeholder]="'Section name'" 
    [error-text]="'Please enter name.'">
    (update)="myEditableTitle = $event">
  </ng-custom-title>
```

##### AngularJS

Well, are you still using AngularJS there? Don't worry! We made it fully compatible with AngularJS, so you only need follow this steps to use...

Then you need inject the Custom Title to your `app.module`
```
import { ngCustomTitleModule } from '...path-to-module';

export const myModule = angular
  .module('my.Module', [ngCustomTitleModule])
  .name;

```

On your AngularJS Component Controller you can add a value to be rendered and be editable ;)

```
export class myComponentController {

  myEditableTitle: string = 'Hi Guys!';

  constructor() {}

}
```

After that you need call the editable title component with one simple component declaration on HTML like:

```
  <ng-custom-title
    [title]="myEditableTitle"
    [placeholder]="'Section name'" 
    [error-text]="'Please enter name.'">
    (update)="myEditableTitle = $event">
  </ng-custom-title>
```