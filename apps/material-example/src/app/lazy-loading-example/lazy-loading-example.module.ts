import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadingExampleComponent } from './lazy-loading-example.component';
import { RouterModule } from '@angular/router';
import { LazyInputComponent } from './control/lazy-input/lazy-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';

@NgModule({
  declarations: [
    LazyLoadingExampleComponent,
    LazyInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LazyLoadingExampleComponent
      }
    ]),
    ReactiveFormsModule,
    MaterialFastFormsModule
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONTROL,
      useValue: {
        type: 'lazy-input',
        component: LazyInputComponent
      } as DynamicFormDefinition,
      multi: true
    }
  ]
})
export class LazyLoadingExampleModule {}
