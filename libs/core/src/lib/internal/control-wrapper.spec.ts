import { FormControl, FormGroup } from "@angular/forms";
import { ActionControlFactory } from "../control";
import { ControlFactory } from "../control/control-factory.decorator";
import { FromActionControlInternal } from "./action/action-control-internal";
import { ControlWrapper } from "./control-wrapper";

describe('ControlWrapper', () => {

  it('should add form control to parent', () => {
    const parent = new FormGroup({});
    ControlWrapper.forFormControl('test', new FormControl()).addToParent(parent);
    expect(parent.controls).toHaveProperty('test');
  });

  it('should log warning if parent is standard on adding action', () => {
    jest.spyOn(console, 'warn');
    const parent = new FormGroup({});
    ControlWrapper.forAction('test', new FromActionControlInternal()).addToParent(parent);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});