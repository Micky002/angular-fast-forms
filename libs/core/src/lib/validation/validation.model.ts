import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { InjectionToken } from '@angular/core';

export const CUSTOM_VALIDATOR = new InjectionToken<ValidatorRegistration>('AFF_CUSTOM_VALIDATOR');
export const CUSTOM_ASYNC_VALIDATOR = new InjectionToken<AsyncValidatorRegistration>('AFF_CUSTOM_ASYNC_VALIDATOR');

export interface SyncValidator {
  (args: Array<string>): ValidatorFn;
}

export interface ValidatorRegistration {
  id: string;
  validator: SyncValidator;
}

export function registerValidatorFn(id: string, validator: ValidatorFn) {
  return {
    provide: CUSTOM_VALIDATOR,
    useValue: {
      id,
      validator: () => {
        return validator;
      }
    } as ValidatorRegistration,
    multi: true
  }
}

export function registerValidatorFnWithArgs(id: string, validator: SyncValidator) {
  return {
    provide: CUSTOM_VALIDATOR,
    useValue: {
      id,
      validator: validator
    } as ValidatorRegistration,
    multi: true
  }
}

export interface AsyncValidatorRegistration {
  id: string;
  validator: AsyncValidatorFn;
}
