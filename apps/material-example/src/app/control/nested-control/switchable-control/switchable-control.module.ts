import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { SwitchableControlComponent } from './switchable-control.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FastFormsModule.forChild({
      controls: [
        SwitchableControlComponent
      ]
    })
  ],
  exports: [
    FastFormsModule
  ]
})
export class SwitchableControlModule {
}
