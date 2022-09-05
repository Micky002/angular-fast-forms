import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorComponent } from './custom-validator/custom-validator.component';
import { RouterModule } from '@angular/router';
import { ValidationComponent } from './validation/validation.component';
import { MatButtonModule } from '@angular/material/button';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { registerValidatorFn, registerValidatorFnWithArgs } from '@ngx-fast-forms/core';

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
    })]
})
export class ValidationModule {
}
