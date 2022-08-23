import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { CUSTOM_ASYNC_VALIDATOR, CUSTOM_VALIDATOR } from '@ngx-fast-forms/core';
import { Provider, Type } from '@angular/core';

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

export interface AsyncValidatorRegistrationFactory {
  id: string;
  validator: () => AsyncValidatorFn;
}

export function registerAsyncValidator(id: string, validator: AsyncValidatorFn) {
  return {
    provide: CUSTOM_ASYNC_VALIDATOR,
    useValue: {
      id,
      validator
    } as AsyncValidatorRegistration,
    multi: true
  }
}

export function registerAsyncValidatorWithDeps(deps: Array<Type<any>>, validatorFactory: Function) {
  return {
    provide: CUSTOM_ASYNC_VALIDATOR,
    deps,
    useFactory: validatorFactory,
    // useValue: {
    //   id,
    //   validator
    // } as AsyncValidatorRegistration,
    multi: true
  } as Provider
}
