import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { FastFormGroupComponent } from './components/fast-form-group/fast-form-group.component';
import { FastFormsService } from './service/fast-forms.service';
import { ValidatorFactoryService } from './validation/validator-factory.service';
import { FormControlFactoryService } from './service/form-control-factory.service';
import { FastFormRowComponent } from './components/fast-form-row/fast-form-row.component';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from './model';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatLuxonDateModule,
  ],
  declarations: [
    FastFormGroupComponent,
    FastFormRowComponent
  ],
  exports: [
    FastFormGroupComponent
  ],
  providers: [
    FastFormsService,
    FormControlFactoryService,
    ValidatorFactoryService,
    {
      provide: DYNAMIC_FORM_CONTROL,
      useValue: {
        type: 'row',
        inline: true,
        component: FastFormRowComponent
      } as DynamicFormDefinition,
      multi: true
    }
  ],
})
export class FastFormsCoreModule {

}
