import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Type } from '@angular/core';
import { BasicQuestion } from './components/question-definition';


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
  children?: Question[];
}

export interface SingleQuestion extends BasicQuestion {
  // id: string;
  type: string;
}

export interface GroupQuestion extends BasicQuestion {
  // id: string;
  type: string;
  children?: Question[];
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

export interface GroupOptions extends AbstractControlOptions {
  type?: string;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: unknown;
}

export type FormControlType = 'control' | 'array' | 'group';
export type FormActionType = 'action';
