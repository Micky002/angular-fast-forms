import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { DYNAMIC_FORM_CONTROL } from '@ngx-fast-forms/core';
import { DateInputComponent } from './ui/date-input/date-input.component';
import { DateFormControl } from './ui/date-input/date-form-control';

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
      provide: DYNAMIC_FORM_CONTROL,
      multi: true,
      useValue: {
        type: 'date-input',
        component: DateInputComponent,
        controlFactory: () => new DateFormControl()
      }
    }
  ]
})

export class MaterialExperimentalFastFormsModule {}
