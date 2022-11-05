import { FormActionGroupInternal } from "./action-group-internal";

describe('FormActionGroupInternal', () => {

  it('should create', () => {
    expect(new FormActionGroupInternal({})).toBeDefined();
  });

  it('should disable control', () => {
    const action = new FormActionGroupInternal({});
    expect(action.disabled).toBeFalsy();
    action.disable();
    expect(action.disabled).toBeTruthy();
    action.enable();
    expect(action.disabled).toBeFalsy();
  });

  it('should reset state', () => {
    const action = new FormActionGroupInternal({});
    action.disable();
    expect(action.disabled).toBeTruthy();
    action.reset();
    expect(action.disabled).toBeFalsy();
  });
});