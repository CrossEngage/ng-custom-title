import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgCustomTitleComponent } from './ng-custom-title.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgCustomTitleComponent],
  entryComponents: [NgCustomTitleComponent],
  exports: [NgCustomTitleComponent]
})

export class NgCustomTitleModule {

}