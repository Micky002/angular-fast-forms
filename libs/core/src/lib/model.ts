import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { InjectionToken, Type } from '@angular/core';
import { BaseFormControlComponent } from './components/base/base-control.component';
import { BaseFormInlineComponent } from './components/base/base-inline.component';
import { BaseFormArrayComponent } from './components/base/base-array.component';
import { BaseFormGroupComponent } from './components/base/base-group.component';
import { InternalControlComponent } from './internal/control/models';
import { BasicQuestion } from './components/question-definition';
import { ControlFactoryMethod } from './question-definition';

export const AFF_CONTROL_COMPONENTS = new InjectionToken<Array<Array<InternalControlComponent>>>('AFF_CONTROL_COMPONENTS');

export interface DynamicFormDefinition {
  type: string;
  inline?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<BaseFormControlComponent<any, any> | BaseFormInlineComponent | BaseFormArrayComponent<any> | BaseFormGroupComponent>;
  controlFactory?: ControlFactoryMethod;
}

export type QuestionProperties = { [key: string]: unknown };

export interface Question extends BasicQuestion {
  type: string;
}

export interface ValidationOptions {
  required?: boolean;
  min?: number;
  minLength?: number;
  max?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: string | RegExp;
  custom?: string | Array<string>;
  customFn?: ValidatorFn | Array<ValidatorFn>;
  customAsync?: string | Array<string>;
  customAsyncFn?: AsyncValidatorFn | Array<AsyncValidatorFn>;
}

export interface FastFormSubmitEvent {
  event: unknown;
  data: unknown;
}

export type FormControlType = 'control' | 'array' | 'group';
export type FormActionType = 'action';


export type EmitEventOption = {
  emitEvent?: boolean
}

export type IndexOption = {
  index?: number
}
