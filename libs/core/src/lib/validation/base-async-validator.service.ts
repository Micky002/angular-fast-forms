import { AsyncValidatorFn } from '@angular/forms';

export interface BaseAsyncValidator {

  getId(): string;

  createValidator(args: string[]): AsyncValidatorFn;
}
