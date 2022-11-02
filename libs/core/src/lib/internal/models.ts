import { Type } from '@angular/core';
import { BaseFormInlineComponent } from '../components/base/base-inline.component';
import { BaseFormArrayComponent } from '../components/base/base-array.component';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { BaseFormGroupComponent } from '../components/base/base-group.component';
import { FormActionType, FormControlType, Question } from '../model';
import { ActionControl } from '../control/action-control';

export type InternalControlType = FormControlType | FormActionType;

export interface InternalControlDefinition {
  type: string;
  inline?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<BaseFormControlComponent<any, any> | BaseFormInlineComponent | BaseFormArrayComponent<any> | BaseFormGroupComponent>;
  controlFactory?: (question: Question) => AbstractControl;
  internalType: InternalControlType;
}

export class ControlWrapper {

  private control: AbstractControl | null;
  private action: ActionControl | null;

  constructor(private id: string, control: AbstractControl | ActionControl, private controlType: InternalControlType) {
    if (controlType === 'action') {
      this.control = null;
      this.action = control;
    } else if (control instanceof AbstractControl) {
      this.control = control;
      this.action = null;
    } else {
      throw new Error('Unsupported type.');
    }
  }

  static forFormControl<T extends AbstractControl>(id: string, formControl: T): ControlWrapper {
    return new ControlWrapper(id, formControl, 'control');
  }

  static forFormArray<T extends FormArray>(id: string, formArray: T): ControlWrapper {
    return new ControlWrapper(id, formArray, 'array');
  }

  static forAction(id: string, actionControl: ActionControl): ControlWrapper {
    return new ControlWrapper(id, actionControl, 'action');
  }
}
