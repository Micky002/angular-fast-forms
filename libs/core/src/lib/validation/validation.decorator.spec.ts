import { Validator } from './validation.decorator';
import { META_VALIDATOR_OPTIONS_KEY } from '../internal/symbols';


class DummyClass {
}

describe('@Validator', () => {

  it('decorate service', () => {
    Validator({
      id: 'test-id',
      type: 'sync'
    })(DummyClass);
    expect(DummyClass).toHaveProperty(META_VALIDATOR_OPTIONS_KEY);
    const validatorDecorated = (DummyClass as any)[META_VALIDATOR_OPTIONS_KEY];
    expect(validatorDecorated.id).toEqual('test-id');
    expect(validatorDecorated.type).toEqual('sync');
  });
});
