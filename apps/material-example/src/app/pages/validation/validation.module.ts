import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorComponent } from './custom-validator/custom-validator.component';
import { RouterModule } from '@angular/router';
import { ValidationComponent } from './validation/validation.component';
import { MatButtonModule } from '@angular/material/button';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import {
  AsyncValidatorRegistration,
  CUSTOM_ASYNC_VALIDATOR,
  registerValidatorFn,
  registerValidatorFnWithArgs
} from '@ngx-fast-forms/core';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [CustomValidatorComponent, ValidationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ValidationComponent,
        children: [{
          path: 'custom-validator',
          component: CustomValidatorComponent
        }]
      }
    ]),
    MatButtonModule,
    MaterialFastFormsModule
  ],
  providers: [
    registerValidatorFnWithArgs('custom-start-with', args => {
      return control => {
        if (!(control.value + '').startsWith(args[0])) {
          return {
            startWith: {
              requiredStart: 'test'
            }
          };
        }
        return null;
      };
    }),
    registerValidatorFn('custom-required', control => {
      if (control.value) {
        return null;
      } else {
        return {
          required: true
        };
      }
    }),
    {
      provide: CUSTOM_ASYNC_VALIDATOR,
      deps: [HttpClient],
      multi: true,
      useFactory: (http: HttpClient) => {
        return {
          id: 'async-start-with',
          validator: control => {
            return http.get('assets/validation/async-start-with.json');
          }
        } as AsyncValidatorRegistration;
      }
    }
  ]
})
export class ValidationModule {
}
