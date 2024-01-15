import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNestedControlComponent } from './custom-nested-control.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRangeInputModule } from './date-range-input/date-range-input.module';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CustomNestedControlComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CustomNestedControlComponent,
    }]),
    FastFormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    DateRangeInputModule,
  ],
})
export class CustomNestedControlModule {
}
