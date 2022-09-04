import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FastFormGroupComponent } from './components/fast-form-group/fast-form-group.component';
import { FastFormsService } from './service/fast-forms.service';
import { ValidatorFactoryService } from './validation/validator-factory.service';
import { ControlFactoryService } from './service/control-factory.service';
import { FastFormRowComponent } from './components/fast-form-row/fast-form-row.component';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from './model';
import { FastFormArrayComponent } from './components/fast-form-array/fast-form-array.component';
import { FastFormControlComponent } from './components/fast-form-control/fast-form-control.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    FastFormGroupComponent,
    FastFormRowComponent,
    FastFormArrayComponent,
    FastFormControlComponent,
  ],
  exports: [FastFormGroupComponent],
  providers: [
    FastFormsService,
    ControlFactoryService,
    ValidatorFactoryService,
    {
      provide: DYNAMIC_FORM_CONTROL,
      useValue: {
        type: 'row',
        inline: true,
        component: FastFormRowComponent,
      } as DynamicFormDefinition,
      multi: true,
    },
    {
      provide: DYNAMIC_FORM_CONTROL,
      useValue: {
        type: 'array',
        inline: true,
        component: FastFormArrayComponent,
      } as DynamicFormDefinition,
      multi: true,
    },
    {
      provide: DYNAMIC_FORM_CONTROL,
      useValue: {
        type: 'group',
        component: FastFormGroupComponent,
      } as DynamicFormDefinition,
      multi: true,
    },
  ],
})
export class FastFormsCoreModule {}
