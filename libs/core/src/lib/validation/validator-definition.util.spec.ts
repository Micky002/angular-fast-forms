import { ValidatorDefinition } from './validator-definition.util';

describe('ValidatorDefinition', () => {

  it('should extract id and arguments', () => {
    let definition = new ValidatorDefinition('test-validator');
    expect(definition.id).toEqual('test-validator');

    definition = new ValidatorDefinition('vali:test');
    expect(definition.id).toEqual('vali');
    expect(definition.args).toEqual(['test']);

    definition = new ValidatorDefinition('vali:test,second,third');
    expect(definition.id).toEqual('vali');
    expect(definition.args).toEqual(['test', 'second', 'third']);
  });
});
