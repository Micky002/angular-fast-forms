import { Injectable } from '@angular/core';
import { BaseValidator, Validator } from '@ngx-fast-forms/core';
import { ValidatorFn } from '@angular/forms';

@Validator({
  id: 'custom-start-with',
  type: 'sync'
})
@Injectable()
export class CustomStartWithService implements BaseValidator {

  createValidator(args: string[]): ValidatorFn {
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
  }
}
