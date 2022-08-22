import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from "@angular/forms";
import { ValidationOptions } from '../model';

@Injectable()
export class ValidatorFactoryService {

  public createValidators(options?: ValidationOptions): ValidatorFn[] {
    const validators: ValidatorFn[] = []
    if (!options) {
      return validators;
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
    return validators;
  }
}
