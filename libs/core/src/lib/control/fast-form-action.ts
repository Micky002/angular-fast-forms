import { FromActionControlInternal } from '../internal/action/action-control-internal';

export interface FormActionControl {

  get disabled(): boolean;

  disable(): void;

  enable(): void;
}

export class ActionControlFactory {

  public static create(): FormActionControl {
    return new FromActionControlInternal();
  }
}