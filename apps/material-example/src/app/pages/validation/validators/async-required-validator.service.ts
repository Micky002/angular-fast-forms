import { Injectable } from '@angular/core';
import { BaseAsyncValidator } from '@ngx-fast-forms/core';
import { AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Injectable()
export class AsyncRequiredValidatorService implements BaseAsyncValidator {

  constructor() { }

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
