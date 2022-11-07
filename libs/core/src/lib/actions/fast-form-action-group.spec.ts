import { ActionControlFactory } from "./fast-form-action";
import { ActionGroupFactory } from "./fast-form-action-group";

describe('FormActionGroup', () => {

  it('should create action group', () => {
    const actionGroup = ActionGroupFactory.create({});
    expect(actionGroup).toBeDefined();
  });

  it('should add action to group', () => {
    const actionGroup = ActionGroupFactory.create({
      add: ActionControlFactory.create()
    });
    expect(actionGroup).toBeDefined();
    expect(actionGroup.get('add')).toBeDefined();
  });
});
