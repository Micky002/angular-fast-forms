import { AsyncValidatorFn } from '@angular/forms';

export interface BaseAsyncValidator {

  createValidator(args: string[]): AsyncValidatorFn;
}
