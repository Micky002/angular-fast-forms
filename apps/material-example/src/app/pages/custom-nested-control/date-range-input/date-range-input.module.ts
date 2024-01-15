import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRangeInputComponent } from './date-range-input.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    DateRangeInputComponent,
  ],
  imports: [
    CommonModule,
    FastFormsModule.forChild({
      controls: [
        DateRangeInputComponent,
      ],
    }),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
})
export class DateRangeInputModule {
}
