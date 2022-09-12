import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { InjectionToken } from '@angular/core';

export interface AsyncValidatorRegistration {
  id: string;
  validator: AsyncValidatorFn;
}
