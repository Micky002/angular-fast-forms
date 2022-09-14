import { toArray } from './array.util';

describe('array.util.ts', () => {
  it('toArray', () => {
    expect(toArray()).toEqual([]);
    expect(toArray('opt')).toEqual(['opt']);
    expect(toArray(['opt', 'another'])).toEqual(['opt', 'another']);
  });
});
