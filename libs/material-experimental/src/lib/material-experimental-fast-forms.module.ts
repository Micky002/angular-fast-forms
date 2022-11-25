import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { AFF_CONTROL_COMPONENTS } from '@ngx-fast-forms/core';
import { DateInputComponent } from './ui/date-input/date-input.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatLuxonDateModule
  ],
  declarations: [
    DateInputComponent
  ],
  providers: [
    {
      provide: AFF_CONTROL_COMPONENTS,
      useValue: [DateInputComponent],
      multi: true
    }
  ]
})

export class MaterialExperimentalFastFormsModule {
}
