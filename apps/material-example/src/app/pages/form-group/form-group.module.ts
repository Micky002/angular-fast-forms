import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NestedComponent } from './nested/nested.component';
import { FormGroupComponent } from './form-group.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormGroupComponent
      },
      {
        path: 'nested-group',
        component: NestedComponent
      }
    ])
  ]
})
export class FormGroupModule { }
