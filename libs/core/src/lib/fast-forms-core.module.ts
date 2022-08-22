import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormService } from './dynamic-form.service';
import { ValidatorFactoryService } from './validation/validator-factory.service';
import { FormControlFactoryService } from './control/form-control-factory.service';

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
    DynamicFormComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  providers: [
    DynamicFormService,
    FormControlFactoryService,
    ValidatorFactoryService
  ]
})
export class FastFormsCoreModule {
}
