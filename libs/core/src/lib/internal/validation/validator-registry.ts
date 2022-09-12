import { Injector } from '@angular/core';
import { BaseValidator } from '../../validation/base-validator.service';
import { InternalValidator } from './models';
import { ValidatorDefinition } from './validator-definition.util';
import { META_VALIDATOR_OPTIONS_KEY } from '../symbols';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { BaseAsyncValidator } from '../../validation/base-async-validator.service';

export class ValidatorRegistry {

  private validators: Array<InternalValidator> = [];

  constructor(private injector: Injector,
              validatorsPerModule: Array<Array<InternalValidator>>) {
    for (const vList of validatorsPerModule) {
      for (const v of (vList ?? [])) {
        this.validate(v);
        this.validators.push(v);
      }
    }
  }

  public hasSyncValidator(def: ValidatorDefinition): boolean {
    return !!this.getValidatorType(def, 'sync');
  }

  public hasAsyncValidator(def: ValidatorDefinition): boolean {
    return !!this.getValidatorType(def, 'async');
  }

  public getSyncValidator(def: ValidatorDefinition): ValidatorFn {
    const validatorType = this.getValidatorType(def, 'sync');
    if (!validatorType) {
      throw new Error(`No sync validator registered with type [${def.id}]`);
    }
    const validatorFactory = this.injector.get(validatorType) as BaseValidator;
    return validatorFactory.createValidator(def.args);
  }

  public getAsyncValidator(def: ValidatorDefinition): AsyncValidatorFn {
    const validatorType = this.getValidatorType(def, 'async');
    if (!validatorType) {
      throw new Error(`No async validator registered with type [${def.id}]`);
    }
    const validatorFactory = this.injector.get(validatorType) as BaseAsyncValidator;
    return validatorFactory.createValidator(def.args);
  }

  private getValidatorType(def: ValidatorDefinition, type: 'sync' | 'async'): InternalValidator | undefined {
    return this.validators.find(validator => {
      const options = validator[META_VALIDATOR_OPTIONS_KEY];
      return options.type === type && options.id === def.id;
    });
  }

  private validate(v: InternalValidator) {
    if (!v[META_VALIDATOR_OPTIONS_KEY]) {
      throw new Error(`Validator must be decorated with [@Validator] decorator.`);
    }
  }
}
