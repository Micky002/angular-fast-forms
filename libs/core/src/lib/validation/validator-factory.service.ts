import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { ValidationOptions } from '../model';
import { ValidatorDefinition } from '../internal/validation/validator-definition.util';
import { VALIDATORS } from '../internal/token';
import { InternalValidator } from '../internal/validation/models';
import { ValidatorRegistry } from '../internal/validation/validator-registry';
import { toArray } from '../internal/util/array.util';


@Injectable({
  providedIn: 'any'
})
export class ValidatorFactoryService {

  private registry: ValidatorRegistry;

  constructor(private injector: Injector,
              @Optional() @Inject(VALIDATORS) registeredValidators?: Array<Array<InternalValidator>>) {
    this.registry = new ValidatorRegistry(injector, registeredValidators ?? []);
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
    validators.push(...this.createCustomSyncValidators(options));
    return Validators.compose(validators);
  }

  public createAsyncValidators(options?: ValidationOptions): Array<AsyncValidatorFn> {
    const validators = toArray(options?.customAsync).map(id => new ValidatorDefinition(id))
      .filter(def => {
        if (this.registry.hasAsyncValidator(def)) {
          return true;
        } else {
          console.warn(`No async validator registered with id [${def.id}].`)
          return false;
        }
      })
      .map(def => this.registry.getAsyncValidator(def));

    if (options?.customAsyncFn) {
      if (options.customAsyncFn instanceof Array) {
        validators.push(...options.customAsyncFn);
      } else {
        validators.push(options.customAsyncFn);
      }
    }
    return validators;
  }

  private createCustomSyncValidators(options?: ValidationOptions): Array<ValidatorFn> {
    const validators = toArray(options?.custom).map(id => new ValidatorDefinition(id))
      .filter(def => {
        if (this.registry.hasSyncValidator(def)) {
          return true;
        } else {
          console.warn(`No sync validator registered with id [${def.id}].`)
          return false;
        }
      })
      .map(def => this.registry.getSyncValidator(def));

    if (options?.customFn) {
      if (options.customFn instanceof Array) {
        validators.push(...options.customFn);
      } else {
        validators.push(options.customFn);
      }
    }
    return validators;
  }
}
