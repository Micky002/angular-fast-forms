import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { CUSTOM_VALIDATOR } from '../model';

export interface ValidatorRegistration {
  id: string;
  validator: ValidatorFn;
}

export function registerValidator(id: string, validator: ValidatorFn) {
  return {
    provide: CUSTOM_VALIDATOR,
    useValue: {
      id,
      validator
    } as ValidatorRegistration,
    multi: true
  }
}

export interface AsyncValidatorRegistration {
  id: string;
  validator: AsyncValidatorFn;
}
