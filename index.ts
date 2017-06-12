import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgCustomTitleComponent } from './ng-custom-title.component';

export const ngCustomTitleModule = angular
  .module('ngCustomTitleComponent', [])
  .directive('ngCustomTitleComponent', downgradeComponent({
    component: NgCustomTitleComponent,
    inputs: ['title', 'placeholder', 'errorText']
  }) as angular.IDirectiveFactory)
  .name;

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgCustomTitleComponent],
  entryComponents: [NgCustomTitleComponent],
  exports: [NgCustomTitleComponent]
})

export class NgCustomTitleModule {

}