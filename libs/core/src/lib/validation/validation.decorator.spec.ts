import { Validator } from './validation.decorator';
import { META_VALIDATOR_OPTIONS_KEY } from '../internal/symbols';
import { InternalValidator } from '../internal/validation/models';


class DummyClass {
}

describe('@Validator', () => {

  it('decorate service', () => {
    Validator({
      id: 'test-id',
      type: 'sync'
    })(DummyClass);
    expect(DummyClass).toHaveProperty(META_VALIDATOR_OPTIONS_KEY);
    const validatorDecorated = (DummyClass as InternalValidator)[META_VALIDATOR_OPTIONS_KEY];
    expect(validatorDecorated.id).toEqual('test-id');
    expect(validatorDecorated.type).toEqual('sync');
  });
});
