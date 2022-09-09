import { ValidatorFn } from '@angular/forms';

export interface BaseValidator {

  getId(): string;

  createValidator(args: string[]): ValidatorFn;
}
