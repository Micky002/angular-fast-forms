import { Validator } from './validation.decorator';
import { META_VALIDATOR_OPTIONS_KEY } from '../internal/symbols';
import { InternalValidator } from '../internal/validation/models';


@Validator({
  id: 'test-id',
  type: 'sync'
})
class TestValidator {
}

describe('@Validator', () => {

  it('should add extra information to decorated class', () => {
    expect(TestValidator).toHaveProperty(META_VALIDATOR_OPTIONS_KEY);
    const validatorDecorated = (TestValidator as InternalValidator)[META_VALIDATOR_OPTIONS_KEY];
    expect(validatorDecorated.id).toEqual('test-id');
    expect(validatorDecorated.type).toEqual('sync');
  });
});
