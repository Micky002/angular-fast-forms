import { FromActionControlInternal } from "./action-control-internal";

describe('FromActionControlInternal', () => {

  it('should create', () => {
    expect(new FromActionControlInternal()).toBeDefined();
  });

  it('should disable control', () => {
    const action = new FromActionControlInternal();
    expect(action.disabled).toBeFalsy();
    action.disable();
    expect(action.disabled).toBeTruthy();
    action.enable();
    expect(action.disabled).toBeFalsy();
  });

  it('should throw error on unsupported methods', () => {
    const action = new FromActionControlInternal();
    expect(() => action.setValue()).toThrowError();
    expect(() => action.patchValue()).toThrowError();
  });

  it('should reset state', () => {
    const action = new FromActionControlInternal();
    action.disable();
    expect(action.disabled).toBeTruthy();
    action.reset();
    expect(action.disabled).toBeFalsy();
  });
});