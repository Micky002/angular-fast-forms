import { AbstractControl, FormGroup } from '@angular/forms';
import { InjectionToken, Type } from "@angular/core";
import { DynamicFormControl } from "./dynamic-form-control";

export const DYNAMIC_FORM_CONTROL = new InjectionToken<DynamicFormDefinition>('DYNAMIC_FORM_CONTROLS');

export interface DynamicFormDefinition {
  type: string;
  component: Type<DynamicFormControl>;
  controlFactory?: () => AbstractControl;
}

export type QuestionProperties = { [key: string]: any };

export interface Question {
  id: string;
  type: 'input' | 'select' | 'group' | 'date-input' | string;
  label?: string;
  validation?: ValidationOptions;
  hidden?: boolean;
  properties?: QuestionProperties
  defaultValue?: string | number | undefined;
  children?: Array<Question>
}

export interface ValidationOptions {
  required?: boolean;
  min?: number;
  minLength?: number;
  max?: number;
  maxLength?: number;
}

export interface FormDefinition {
  form: FormGroup;
  controls: Array<QuestionDefinition>

  setValue(value: any): void;

  patchValue(value: any): void;
}

export interface QuestionDefinition {
  id: string;
  type: 'input' | 'select' | 'group';
  label?: string;
  properties: { [key: string]: any }
  subDef?: FormDefinition
}
