import { Inject, Injectable, Optional } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { ValidationOptions } from '../model';
import {
  AsyncValidatorRegistration,
  CUSTOM_ASYNC_VALIDATOR,
  CUSTOM_VALIDATOR,
  SyncValidator,
  ValidatorRegistration
} from './validation.model';
import { ValidatorDefinition } from './validator-definition.util';


@Injectable({
  providedIn: 'any'
})
export class ValidatorFactoryService {

  private validatorRegistry: {[key: string]: SyncValidator} = {};
  private asyncValidatorRegistry: {[key: string]: AsyncValidatorFn} = {};

  constructor(@Optional() @Inject(CUSTOM_VALIDATOR) private customValidators?: Array<ValidatorRegistration>,
              @Optional() @Inject(CUSTOM_ASYNC_VALIDATOR) private customAsyncValidators?: Array<AsyncValidatorRegistration>) {
    if (customValidators) {
      customValidators.forEach(valReg => {
        if (!valReg.id) {
          throw new Error('Id of validator is missing.');
        }
        this.validatorRegistry[valReg.id] = valReg.validator;
      })
    }
    if (customAsyncValidators) {
      customAsyncValidators.forEach(valReg => {
        if (!valReg.id) {
          throw new Error('Id of async validator is missing.');
        }
        this.asyncValidatorRegistry[valReg.id] = valReg.validator;
      })
    }
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
    if (options.pattern) {
      validators.push(Validators.pattern(options.pattern));
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

  private registerCustomValidators<T extends ValidatorFn | AsyncValidatorFn>(
    validatorResolver: (id: ValidatorDefinition) => T, custom?: string | Array<string>, customFn?: T | Array<T>
  ): Array<T> {
    const validators: T[] = [];
    if (custom) {
      if (custom instanceof Array) {
        custom.map(validatorId => validatorResolver(new ValidatorDefinition(validatorId)))
          .forEach(validator => validators.push(validator));
      } else {
        const validator = validatorResolver(new ValidatorDefinition(custom));
        validators.push(validator);
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

  private getCustomValidator = (def: ValidatorDefinition): ValidatorFn => {
    const validator = this.validatorRegistry[def.id];
    if (!validator) {
      throw new Error(`No validator registered with id [${def.id}].`);
    }
    return validator(def.args);
  }

  private getCustomAsyncValidator = (def: ValidatorDefinition): AsyncValidatorFn => {
    const validator = this.asyncValidatorRegistry[def.id];
    if (!validator) {
      throw new Error(`No async validator registered with id [${def.id}].`);
    }
    return validator;
  }
}
