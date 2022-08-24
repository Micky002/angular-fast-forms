import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { InjectionToken } from '@angular/core';

export const CUSTOM_VALIDATOR = new InjectionToken<ValidatorRegistration>('AFF_CUSTOM_VALIDATOR');
export const CUSTOM_ASYNC_VALIDATOR = new InjectionToken<AsyncValidatorRegistration>('AFF_CUSTOM_ASYNC_VALIDATOR');

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
