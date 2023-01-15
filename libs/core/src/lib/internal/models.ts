import { Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormActionType, FormControlType, Question } from '../model';

export type InternalControlType = FormControlType | FormActionType;

export interface InternalControlDefinition {
  type: string;
  inline?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<unknown>;
  controlFactory?: (question: Question) => AbstractControl;
  internalType: InternalControlType;
}
