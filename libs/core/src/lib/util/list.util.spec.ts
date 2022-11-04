import { flattenArray } from './list.util';

describe('list util', () => {
  it('should flatten list', () => {
    expect(flattenArray([['1-in', '2-in'], [], ['3-in']])).toEqual(['1-in', '2-in', '3-in']);
  });
});
