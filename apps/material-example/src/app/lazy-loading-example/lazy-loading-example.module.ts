import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadingExampleComponent } from './lazy-loading-example.component';
import { RouterModule } from '@angular/router';
import { LazyInputComponent } from './control/lazy-input/lazy-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { registerControl } from '@ngx-fast-forms/core';
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
    registerControl('lazy-input', LazyInputComponent)
  ]
})
export class LazyLoadingExampleModule {}
