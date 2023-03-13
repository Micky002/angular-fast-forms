import { Injectable } from '@angular/core';
import { BaseValidator, Validator } from '@ngx-fast-forms/core';
import { ValidatorFn } from '@angular/forms';

@Validator({
  id: 'custom-required',
  type: 'sync'
})
@Injectable()
export class CustomRequiredService implements BaseValidator {

  createValidator(): ValidatorFn {
    return control => {
      if (control.value) {
        return null;
      } else {
        return {
          required: true
        };
      }
    };
  }
}
