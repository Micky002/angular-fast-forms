import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { InjectionToken, Type } from '@angular/core';
import { BaseFormControlComponent } from './components/base/base-control.component';
import { BaseFormInlineComponent } from './components/base/base-inline.component';
import { BaseFormArrayComponent } from './components/base/base-array.component';
import { BaseFormGroupComponent } from './components/base/base-group.component';
import { InternalControlComponent } from './internal/control/models';
import { QuestionProperties } from './question.properties';


export interface DynamicFormDefinition {
  type: string;
  inline?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<BaseFormControlComponent<any, any> | BaseFormInlineComponent | BaseFormArrayComponent<any> | BaseFormGroupComponent>;
  controlFactory?: (question: Question) => AbstractControl;
}

export interface BasicQuestion {
  id: string;
  label?: string;
  hidden?: boolean;
  validation?: ValidationOptions;
  properties?: QuestionProperties;
  defaultValue?: string | number;
}

export interface Question extends BasicQuestion {
  type: string;
  children?: Array<Question>;
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
