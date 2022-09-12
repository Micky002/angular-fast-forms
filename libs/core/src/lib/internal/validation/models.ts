import { META_VALIDATOR_OPTIONS_KEY } from '../symbols';
import { Type } from '@angular/core';
import { BaseAsyncValidator } from '../../validation/base-async-validator.service';
import { BaseValidator } from '../../validation/base-validator.service';

export interface InternalValidator extends Type<BaseValidator | BaseAsyncValidator> {
  [META_VALIDATOR_OPTIONS_KEY]: ValidatorMetaData;
}

export interface ValidatorMetaData {
  type: 'sync' | 'async';
  id: string;
}
