import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { FastFormComponent } from './dynamic-form/fast-form.component';
import { FastFormsService } from './service/fast-forms.service';
import { ValidatorFactoryService } from './validation/validator-factory.service';
import { FormControlFactoryService } from './service/form-control-factory.service';
import { FormRowComponent } from './components/form-row/form-row.component';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from './model';
import { UiRegistryService } from './service/ui-registry.service';

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
  declarations: [FastFormComponent, FormRowComponent],
  exports: [FastFormComponent],
  providers: [
    FastFormsService,
    UiRegistryService,
    FormControlFactoryService,
    ValidatorFactoryService,
    {
      provide: DYNAMIC_FORM_CONTROL,
      useValue: {
        type: 'row',
        inline: true,
        component: FormRowComponent
      } as DynamicFormDefinition,
      multi: true
    }
  ],
})
export class FastFormsCoreModule {}
