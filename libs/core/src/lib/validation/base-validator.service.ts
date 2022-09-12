import { ValidatorFn } from '@angular/forms';

export interface BaseValidator {

  createValidator(args: string[]): ValidatorFn;
}
