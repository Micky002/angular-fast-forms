import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArrayIndexDirective } from './actions/array-index.directive';
import { FastFormArrayComponent } from './components/fast-form-array/fast-form-array.component';
import { FastFormControlComponent } from './components/fast-form-control/fast-form-control.component';
import { FastFormGroupComponent } from './components/fast-form-group/fast-form-group.component';
import { FastFormRowComponent } from './components/fast-form-row/fast-form-row.component';
import { VALIDATORS } from './internal/token';
import { AFF_CONTROL_COMPONENTS } from './model';
import { FastFormBuilder } from './service/fast-form-builder';
import { FormRendererDirective } from './directive/form-renderer.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    FastFormGroupComponent,
    FastFormArrayComponent,
    FastFormControlComponent,
    FastFormRowComponent,
    ArrayIndexDirective,
    FormRendererDirective
  ],
  exports: [
    FastFormGroupComponent,
    FastFormControlComponent,
    FastFormRowComponent,
    ArrayIndexDirective,
    FormRendererDirective
  ],
  providers: [
    FastFormBuilder,
    {
      provide: AFF_CONTROL_COMPONENTS,
      useValue: [
        FastFormArrayComponent,
        FastFormGroupComponent,
        FastFormRowComponent
      ],
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
