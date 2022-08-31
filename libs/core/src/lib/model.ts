import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { InjectionToken, Type } from '@angular/core';
import { BaseFormControlComponent } from './components/base/base-control.component';
import { BaseFormInlineComponent } from './components/base/base-inline.component';
import { BaseFormArrayComponent } from './components/base/base-array.component';

export const DYNAMIC_FORM_CONTROL = new InjectionToken<DynamicFormDefinition>('AFF_DYNAMIC_FORM_CONTROL');

export interface DynamicFormDefinition {
  type: string;
  inline?: boolean;
  component: Type<BaseFormControlComponent | BaseFormInlineComponent | BaseFormArrayComponent>;
  controlFactory?: (question: Question) => AbstractControl;
}

export type QuestionProperties = { [key: string]: unknown };

export interface Question {
  id: string;
  type: 'group' | 'row' | 'input' | 'select' | 'date-input' | string;
  label?: string;
  validation?: ValidationOptions;
  hidden?: boolean;
  properties?: QuestionProperties
  defaultValue?: string | number;
  children?: Array<Question>;
}

export interface ValidationOptions {
  required?: boolean;
  min?: number;
  minLength?: number;
  max?: number;
  maxLength?: number;
  email?: boolean;
  custom?: string | Array<string>;
  customFn?: ValidatorFn | Array<ValidatorFn>;
  customAsync?: string | Array<string>;
  customAsyncFn?: AsyncValidatorFn | Array<AsyncValidatorFn>;
}

export interface FastFormSubmitEvent {
  event: unknown;
  data: unknown;
}
