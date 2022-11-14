import { ControlIdImpl } from './control-id-impl';

describe('ControlIdImpl', () => {

  it('should create basic id', () => {
    const id = new ControlIdImpl().addPart('meins').addPart('deins');
    expect(id.getId()).toEqual('meins.deins');
  });

  it('should not change parent when array', () => {
    const parent = new ControlIdImpl().addPart('test-array');
    const firstProvider = {index: 0};
    const secondProvider = {index: 1};
    const firstItem = parent.addIndex(undefined, firstProvider);
    const secondItem = parent.addIndex(undefined, secondProvider);
    expect(parent.getId()).toEqual('test-array');
    expect(firstItem.getId()).toEqual('test-array[0]');
    expect(secondItem.getId()).toEqual('test-array[1]');

    firstProvider.index = 5;
    expect(firstItem.getId()).toEqual('test-array[5]');
    expect(secondItem.getId()).toEqual('test-array[1]');

    secondProvider.index = 10;
    expect(firstItem.getId()).toEqual('test-array[5]');
    expect(secondItem.getId()).toEqual('test-array[10]');
  });

  it('should add array index on first position', () => {
    const id = new ControlIdImpl().addIndex(undefined, {index: 0});
    expect(id.getId()).toEqual('[0]');
  });

  it('should add array index with part on first position', () => {
    const id = new ControlIdImpl().addIndex('test', {index: 0});
    expect(id.getId()).toEqual('[0].test');
  });

  it('should add array if last is also array', () => {
    const provider1 = {index: 0};
    const provider2 = {index: 4};
    const id = new ControlIdImpl().addIndex(undefined, provider1).addIndex(undefined, provider2);
    expect(id.getId()).toEqual('[0].[4]');
    provider1.index = 5;
    provider2.index = 19;
    expect(id.getId()).toEqual('[5].[19]');
  });
});
