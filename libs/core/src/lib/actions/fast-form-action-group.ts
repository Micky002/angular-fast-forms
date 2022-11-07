import { FormActionGroupInternal } from "../internal/action/action-group-internal";
import { FormActionControl } from "./fast-form-action";

export interface FormActionGroup {

  get disabled(): boolean;

  get(path: string): FormActionControl | FormActionGroup | null;

  disable(): void;

  enable(): void;
}

export class ActionGroupFactory {

  public static create(children: {[key: string]: FormActionControl | FormActionGroup}): FormActionGroup {
    return new FormActionGroupInternal(children as any);
  }
}