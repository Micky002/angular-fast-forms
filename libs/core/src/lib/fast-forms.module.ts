import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FastFormGroupComponent } from './components/fast-form-group/fast-form-group.component';
import { VALIDATORS } from './internal/token';
import { CommonModule } from '@angular/common';
import { FastFormArrayComponent } from './components/fast-form-array/fast-form-array.component';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from './model';
import { FastFormRowComponent } from './components/fast-form-row/fast-form-row.component';
import { FastFormControlComponent } from './components/fast-form-control/fast-form-control.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    FastFormGroupComponent,
    FastFormArrayComponent,
    FastFormControlComponent,
    FastFormRowComponent
  ],
  exports: [
    FastFormGroupComponent
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONTROL,
      useValue: {
        type: 'row',
        inline: true,
        component: FastFormRowComponent
      } as DynamicFormDefinition,
      multi: true
    },
    {
      provide: DYNAMIC_FORM_CONTROL,
      useValue: {
        type: 'array',
        inline: true,
        component: FastFormArrayComponent
      } as DynamicFormDefinition,
      multi: true
    },
    // {
    //   provide: DYNAMIC_FORM_CONTROL,
    //   useValue: {
    //     type: 'group',
    //     component: FastFormGroupComponent
    //   } as DynamicFormDefinition,
    //   multi: true
    // }
  ]
})
export class FastFormsModule {

  public static forRoot(options?: {
    validators?: Array<any>
  }): ModuleWithProviders<FastFormsModule> {
    return {
      ngModule: FastFormsModule,
      providers: [
        ...(options?.validators ?? []),
        {
          provide: VALIDATORS,
          multi: true,
          useValue: (options?.validators ?? [])
        }
      ]
    };
  }

  public static forChild(options?: {
    validators?: Array<any>
  }): ModuleWithProviders<FastFormsModule> {
    return {
      ngModule: FastFormsModule,
      providers: [
        ...(options?.validators ?? []),
        {
          provide: VALIDATORS,
          multi: true,
          useValue: (options?.validators ?? [])
        }
      ]
    };
  }
}
