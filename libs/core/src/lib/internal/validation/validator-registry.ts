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

  public hasSyncValidator(id: string): boolean {
    return !!this.getValidatorType(id, 'sync');
  }

  public hasAsyncValidator(id: string): boolean {
    return !!this.getValidatorType(id, 'async');
  }

  public hasValidator(id: string, type: ValidatorType): boolean {
    return !!this.getValidatorType(id, type);
  }

  public getSyncValidator(def: ValidatorDefinition): ValidatorFn {
    return this.createValidator(def, 'sync');
  }

  public getAsyncValidator(def: ValidatorDefinition): AsyncValidatorFn {
    return this.createValidator(def, 'async');
  }

  public getValidator(def: ValidatorDefinition, type: ValidatorType): ValidatorFn | AsyncValidatorFn {
    return this.createValidator(def, type);
  }

  private createValidator(def: ValidatorDefinition, type: ValidatorType) {
    const validatorType = this.getValidatorType(def.id, type);
    if (!validatorType) {
      throw new Error(`No ${type} validator registered with type [${def.id}]`);
    }
    const validatorFactory = this.injector.get(validatorType);
    return validatorFactory.createValidator(def.args);
  }

  private getValidatorType(id: string, type: ValidatorType): InternalValidator | undefined {
    return this.validators.find(validator => {
      const options = validator[META_VALIDATOR_OPTIONS_KEY];
      return options.type === type && options.id === id;
    });
  }

  private validate(v: InternalValidator) {
    if (!v[META_VALIDATOR_OPTIONS_KEY]) {
      throw new Error(`Validator must be decorated with [@Validator] decorator.`);
    }
  }
}
