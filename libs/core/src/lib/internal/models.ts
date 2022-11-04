import { Type } from '@angular/core';
import { BaseFormInlineComponent } from '../components/base/base-inline.component';
import { BaseFormArrayComponent } from '../components/base/base-array.component';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { BaseFormGroupComponent } from '../components/base/base-group.component';
import { FormActionType, FormControlType, Question } from '../model';
import { FromActionControlInternal } from './action/action-control-internal';
import { FastFormGroup } from '@ngx-fast-forms/core';

export type InternalControlType = FormControlType | FormActionType;

export interface InternalControlDefinition {
  type: string;
  inline?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<BaseFormControlComponent<any, any> | BaseFormInlineComponent | BaseFormArrayComponent<any> | BaseFormGroupComponent>;
  controlFactory?: (question: Question) => AbstractControl;
  internalType: InternalControlType;
}
