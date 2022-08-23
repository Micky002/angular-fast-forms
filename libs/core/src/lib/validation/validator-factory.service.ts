import { Inject, Injectable, Optional } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { CUSTOM_ASYNC_VALIDATOR, CUSTOM_VALIDATOR, ValidationOptions } from '../model';
import { AsyncValidatorRegistration, ValidatorRegistration } from './validation.model';

@Injectable()
export class ValidatorFactoryService {

  constructor(@Optional() @Inject(CUSTOM_VALIDATOR) private customValidators?: Array<ValidatorRegistration>,
              @Optional() @Inject(CUSTOM_ASYNC_VALIDATOR) private customAsyncValidators?: Array<AsyncValidatorRegistration>) {
    // TODO validate validators
  }

  public createValidators(options?: ValidationOptions): ValidatorFn | null {
    const validators: ValidatorFn[] = [];
    if (!options) {
      return null;
    }
    if (options.required) {
      validators.push(Validators.required);
    }
    if (options.min) {
      validators.push(Validators.min(options.min));
    }
    if (options.minLength) {
      validators.push(Validators.minLength(options.minLength));
    }
    if (options.max) {
      validators.push(Validators.max(options.max));
    }
    if (options.maxLength) {
      validators.push(Validators.maxLength(options.maxLength));
    }
    if (options.email) {
      validators.push(Validators.email);
    }
    this.registerCustomValidators(this.getCustomValidator, options.custom, options.customFn).forEach(v => validators.push(v));
    return Validators.compose(validators);
  }

  public createAsyncValidators(options?: ValidationOptions): Array<AsyncValidatorFn> | null {
    const validators: AsyncValidatorFn[] = [];
    if (!options) {
      return [];
    }
    this.registerCustomValidators(this.getCustomAsyncValidator, options.customAsync, options.customAsyncFn).forEach(v => validators.push(v));
    return validators;
  }

  private registerCustomValidators<T extends ValidatorFn | AsyncValidatorFn, R extends ValidatorRegistration | AsyncValidatorRegistration>(
    validatorResolver: (id: string) => R, custom?: string | Array<string>, customFn?: T | Array<T>
  ): Array<T> {
    const validators: T[] = [];
    if (custom) {
      if (custom instanceof Array) {
        custom.map(validatorId => validatorResolver(validatorId))
          .forEach(validator => validators.push(validator.validator as T));
      } else {
        const validator = validatorResolver(custom);
        validators.push(validator.validator as T);
      }
    }
    if (customFn) {
      if (customFn instanceof Array) {
        validators.push(...customFn);
      } else {
        validators.push(customFn);
      }
    }
    return validators;
  }

  private getCustomValidator = (id: string): ValidatorRegistration => {
    if (!this.customValidators || this.customValidators.length === 0) {
      throw new Error(`No validator registered with id [${id}].`);
    }
    const validator = this.customValidators.find(vali => vali.id === id);
    if (!validator) {
      throw new Error(`No validator registered with id [${id}].`);
    }
    return validator;
  }

  private getCustomAsyncValidator = (id: string): AsyncValidatorRegistration => {
    if (!this.customAsyncValidators || this.customAsyncValidators.length === 0) {
      throw new Error(`No async validator registered with id [${id}].`);
    }
    const validator = this.customAsyncValidators.find(vali => vali.id === id);
    if (!validator) {
      throw new Error(`No async validator registered with id [${id}].`);
    }
    return validator;
  }
}
