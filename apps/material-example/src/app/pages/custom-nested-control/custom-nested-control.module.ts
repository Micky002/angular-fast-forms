import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeInputComponent } from './date-range-input/date-range-input.component';
import { CustomNestedControlComponent } from './custom-nested-control.component';
import { RouterModule } from '@angular/router';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

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
    FastFormsModule.forChild({
      controls: [
        DateRangeInputComponent
      ]
    }),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class CustomNestedControlModule {}
