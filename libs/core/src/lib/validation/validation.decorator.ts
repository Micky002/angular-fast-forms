import { META_VALIDATOR_OPTIONS_KEY } from '../internal/symbols';
import { InternalValidator } from '../internal/validation/models';

export interface ValidatorOptions {
  id: string;
  type: 'sync' | 'async';
}

export function Validator(options: ValidatorOptions) {

  return (target: unknown): void => {
    const validatorClass: InternalValidator = target as InternalValidator;
    validatorClass[META_VALIDATOR_OPTIONS_KEY] = {
      id: options.id,
      type: options.type
    };
  }
}
