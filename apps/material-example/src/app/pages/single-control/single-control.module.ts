import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleControlComponent } from './single-control.component';
import { RouterModule } from '@angular/router';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';

@NgModule({
  declarations: [
    SingleControlComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SingleControlComponent
    }]),
    FastFormsModule.forChild(),
    MaterialFastFormsModule
  ]
})
export class SingleControlModule {
}
