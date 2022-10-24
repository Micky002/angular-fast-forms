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
    const firstItem = parent.addIndex(firstProvider);
    const secondItem = parent.addIndex(secondProvider);
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
});
