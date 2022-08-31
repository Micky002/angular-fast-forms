import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SelectComponent } from './ui/select/select.component';
import { InputComponent } from './ui/input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { DateInputComponent } from './ui/date-input/date-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { DateFormControl } from './ui/date-input/date-form-control';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, FastFormsCoreModule } from '@ngx-fast-forms/core';

@NgModule({
  imports: [
    CommonModule,
    FastFormsCoreModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatLuxonDateModule
  ],
  declarations: [
    SelectComponent,
    InputComponent,
    DateInputComponent
  ],
  exports: [
    FastFormsCoreModule
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONTROL,
      multi: true,
      useValue: {
        type: 'select',
        component: SelectComponent
      }
    },
    {
      provide: DYNAMIC_FORM_CONTROL,
      multi: true,
      useValue: {
        type: 'input',
        component: InputComponent
      } as DynamicFormDefinition
    },
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
export class MaterialFastFormsModule {
}
