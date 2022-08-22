import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './core/dynamic-form/dynamic-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormService } from './core/dynamic-form.service';
import { DYNAMIC_FORM_CONTROL } from './core/model';
import { SelectComponent } from './ui/select/select.component';
import { InputComponent } from './ui/input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { DateInputComponent } from './ui/date-input/date-input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { FormControlFactoryService } from './core/control/form-control-factory.service';
import { DateFormControl } from './ui/date-input/date-form-control';
import { ValidatorFactoryService } from "./core/validation/validator-factory.service";

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
    DynamicFormComponent,
    SelectComponent,
    InputComponent,
    DateInputComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  providers: [
    DynamicFormService,
    FormControlFactoryService,
    ValidatorFactoryService,
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
      }
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
export class DynamicFormsModule {
}
