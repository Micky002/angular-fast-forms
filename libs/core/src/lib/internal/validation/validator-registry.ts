import { Injector } from '@angular/core';
import { InternalValidator } from './models';
import { ValidatorDefinition } from './validator-definition.util';
import { META_VALIDATOR_OPTIONS_KEY } from '../symbols';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { ValidatorType } from '../../validation/symbols';

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
    return this.getValidator(def, 'sync');
  }

  public getAsyncValidator(def: ValidatorDefinition): AsyncValidatorFn {
    return this.getValidator(def, 'async');
  }

  private getValidator(def: ValidatorDefinition, type: ValidatorType) {
    const validatorType = this.getValidatorType(def, type);
    if (!validatorType) {
      throw new Error(`No ${type} validator registered with type [${def.id}]`);
    }
    const validatorFactory = this.injector.get(validatorType);
    return validatorFactory.createValidator(def.args);
  }

  private getValidatorType(def: ValidatorDefinition, type: ValidatorType): InternalValidator | undefined {
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
