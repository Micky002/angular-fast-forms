import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { ValidationOptions } from '../model';
import { ValidatorDefinition } from '../internal/validation/validator-definition.util';
import { VALIDATORS } from '../internal/token';
import { InternalValidator } from '../internal/validation/models';
import { ValidatorRegistry } from '../internal/validation/validator-registry';
import { toArray } from '../internal/util/array.util';
import { ValidatorType } from './symbols';


@Injectable({
  providedIn: 'any'
})
export class ValidatorFactoryService {

  private registry: ValidatorRegistry;

  constructor(private injector: Injector,
              @Optional() @Inject(VALIDATORS) registeredValidators?: Array<Array<InternalValidator>>) {
    this.registry = new ValidatorRegistry(injector, registeredValidators ?? []);
  }

  public createValidators(options?: ValidationOptions): Array<ValidatorFn> | null {
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
    validators.push(...this.createCustomValidators('sync', options));
    return validators;
  }

  public createAsyncValidators(options?: ValidationOptions): Array<AsyncValidatorFn> {
    return this.createCustomValidators('async', options) as Array<AsyncValidatorFn>;
  }

  private createCustomValidators(type: ValidatorType, options?: ValidationOptions): Array<ValidatorFn> | Array<AsyncValidatorFn> {
    const validatorIds = toArray(type === 'sync' ? options?.custom : options?.customAsync);
    const validators = validatorIds.map(id => new ValidatorDefinition(id))
      .filter(def => {
        if (this.registry.hasValidator(def.id, type)) {
          return true;
        } else {
          console.warn(`No ${type} validator registered with id [${def.id}].`)
          return false;
        }
      })
      .map(def => this.registry.getValidator(def, type));

    if (type === 'sync') {
      validators.push(...toArray(options?.customFn));
    } else {
      validators.push(...toArray(options?.customAsyncFn));
    }
    return validators;

  }
}
