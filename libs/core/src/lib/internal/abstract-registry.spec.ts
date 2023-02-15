import { AbstractRegistry } from './abstract-registry';

describe('AbstractRegistry', () => {

  it('should validate duplicated id of item', () => {
    expect(() => new DummyRegistry([['dupl-id', 'dupl-id']]))
        .toThrowError('Id [dupl-id] already exist.');
  });

  it('should validate item', () => {
    expect(() => new DummyRegistry([['invalid']]))
        .toThrowError('Invalid registry item');
  });

  it('should check if id exists', () => {
    const registry = new DummyRegistry([['first', 'second'], ['one', 'two']]);
    expect(registry.hasItem('first')).toBeTruthy();
    expect(registry.hasItem('one')).toBeTruthy();
    expect(registry.hasItem('not-found')).toBeFalsy();
  });

  it('should throw error if id does not exist', () => {
    const registry = new DummyRegistry([['first', 'second'], ['one', 'two']]);
    expect(() => registry.getItem('not-in-registry'))
        .toThrowError('No item with id [not-in-registry] found in registry.');
  });
});

class DummyRegistry extends AbstractRegistry<string> {

  constructor(items?: Array<Array<string>>) {
    super(items);
  }

  validate(item: string): void {
    if (item === 'invalid') {
      throw new Error('Invalid registry item.');
    }
  }

  ids(item: string): string[] {
    return [item];
  }
}
