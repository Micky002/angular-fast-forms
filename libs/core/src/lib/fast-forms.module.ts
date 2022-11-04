import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FastFormGroupComponent } from './components/fast-form-group/fast-form-group.component';
import { VALIDATORS } from './internal/token';
import { CommonModule } from '@angular/common';
import { FastFormArrayComponent } from './components/fast-form-array/fast-form-array.component';
import { AFF_CONTROL_COMPONENTS, DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from './model';
import { FastFormRowComponent } from './components/fast-form-row/fast-form-row.component';
import { FastFormControlComponent } from './components/fast-form-control/fast-form-control.component';
import { ArrayIndexDirective } from './actions/array-index.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    FastFormGroupComponent,
    FastFormArrayComponent,
    FastFormControlComponent,
    FastFormRowComponent,
    ArrayIndexDirective
  ],
  exports: [
    FastFormGroupComponent,
    FastFormControlComponent,
    FastFormRowComponent,
    ArrayIndexDirective
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
      provide: AFF_CONTROL_COMPONENTS,
      useValue: [FastFormArrayComponent],
      multi: true
    }
  ]
})
export class FastFormsModule {

  public static forRoot(options?: {
    validators?: Array<any>,
    controls?: Array<any>
  }): ModuleWithProviders<FastFormsModule> {
    return {
      ngModule: FastFormsModule,
      providers: [
        ...(options?.validators ?? []),
        {
          provide: VALIDATORS,
          multi: true,
          useValue: (options?.validators ?? [])
        },
        {
          provide: AFF_CONTROL_COMPONENTS,
          multi: true,
          useValue: (options?.controls ?? [])
        }
      ]
    };
  }

  public static forChild(options?: {
    validators?: Array<any>,
    controls?: Array<any>
  }): ModuleWithProviders<FastFormsModule> {
    return {
      ngModule: FastFormsModule,
      providers: [
        ...(options?.validators ?? []),
        {
          provide: VALIDATORS,
          multi: true,
          useValue: (options?.validators ?? [])
        },
        {
          provide: AFF_CONTROL_COMPONENTS,
          multi: true,
          useValue: (options?.controls ?? [])
        }
      ]
    };
  }
}
