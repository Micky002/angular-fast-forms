import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { FormArrayRootComponent } from './form-array-root.component';
import { FormArrayComponent } from './form-array.component';
import { NestedComponent } from './nested/nested.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormArrayRootComponent,
        children: [
          {
            path: 'general',
            component: FormArrayComponent
          },
          {
            path: 'nested',
            component: NestedComponent
          }
        ]
      }
    ]),
    FastFormsModule.forChild(),
    MaterialFastFormsModule
  ],
  declarations: [NestedComponent]
})
export class SingleControlModule {
}
