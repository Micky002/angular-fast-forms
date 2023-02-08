import { FromActionControlInternal } from '../internal/action/action-control-internal';
import { FormActionControl } from './fast-form-action';
import { FormActionGroupInternal } from '../internal/action/action-group-internal';
import { FormActionGroup } from './fast-form-action-group';

export class ActionControlFactory {

  public static create(): FormActionControl {
    return new FromActionControlInternal();
  }
}

export class ActionGroupFactory {

  public static create(children: { [key: string]: FormActionControl | FormActionGroup }): FormActionGroup {
    return new FormActionGroupInternal(children as any);
  }
}
