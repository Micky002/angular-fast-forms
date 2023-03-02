import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export type ValidatorType = 'sync' | 'async';

export type ValidatorFunctionType = {
  sync: ValidatorFn;
  async: AsyncValidatorFn;
};
