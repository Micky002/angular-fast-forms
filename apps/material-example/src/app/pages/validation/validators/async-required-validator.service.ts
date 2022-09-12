import { Injectable } from '@angular/core';
import { BaseAsyncValidator, Validator } from '@ngx-fast-forms/core';
import { AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Validator({})
@Injectable({
  providedIn: 'root'
})
export class AsyncRequiredValidatorService implements BaseAsyncValidator {

  constructor() {
    console.log('AsyncRequiredValidatorService')
  }

  createValidator(args: string[]): AsyncValidatorFn {
    return control => {
      return of({
        required: true
      })
    };
  }

  getId(): string {
    return 'custom-async-required';
  }
}
