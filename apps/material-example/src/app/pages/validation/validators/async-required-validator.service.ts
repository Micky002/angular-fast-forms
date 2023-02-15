import { Injectable } from '@angular/core';
import { BaseAsyncValidator, Validator } from '@ngx-fast-forms/core';
import { AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Validator({
  id: 'custom-async-required',
  type: 'async'
})
@Injectable()
export class AsyncRequiredValidatorService implements BaseAsyncValidator {

  createValidator(): AsyncValidatorFn {
    return () => {
      return of({
        required: true
      });
    };
  }
}
