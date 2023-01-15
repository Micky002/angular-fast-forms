import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { InjectionToken, Type } from '@angular/core';
import { InternalControlComponent } from './internal/control/models';
import { BasicQuestion } from './components/question-definition';

export const AFF_CONTROL_COMPONENTS = new InjectionToken<Array<Array<InternalControlComponent>>>('AFF_CONTROL_COMPONENTS');

export interface DynamicFormDefinition {
  type: string;
  inline?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<unknown>;
  controlFactory?: (question: Question) => AbstractControl;
}

export type QuestionProperties = { [key: string]: unknown };

export interface Question extends BasicQuestion {
  id: string;
  type: string;
}

export interface SingleQuestion extends BasicQuestion {
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
