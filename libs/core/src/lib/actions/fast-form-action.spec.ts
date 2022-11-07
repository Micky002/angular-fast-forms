import { ActionControlFactory } from "./fast-form-action";

describe('FormActionControl', () => {

  it('should create action control', () => {
    const actionControl = ActionControlFactory.create();
    expect(actionControl).toBeDefined();
  });

  it('should disable action', () => {
    const action = ActionControlFactory.create();
    expect(action.disabled).toBeFalsy();
    action.disable();
    expect(action.disabled).toBeTruthy();
    action.enable();
    expect(action.disabled).toBeFalsy();
  });
});
