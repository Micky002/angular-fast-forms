import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeInputComponent } from './date-range-input/date-range-input.component';
import { CustomNestedControlComponent } from './custom-nested-control.component';
import { RouterModule } from '@angular/router';
import { FastFormsCoreModule, registerGroup } from '@ngx-fast-forms/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    DateRangeInputComponent,
    CustomNestedControlComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CustomNestedControlComponent
    }]),
    FastFormsCoreModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [
    registerGroup('date-range', DateRangeInputComponent)
  ]
})
export class CustomNestedControlModule {}
