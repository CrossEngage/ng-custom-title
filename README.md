# ng-custom-title
Angular custom titles @Component :)

### How to use it


#### Instalation

first you need install the 
```
  npm install ng-custon-title
```

Then you need inject the Custom Title module to your project
```
  code go here

```


#### Usage

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


