import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControlOptions,
  ValidatorFn
} from '@angular/forms';
import { ValidationOptions } from './model';
import { FastFormBuilder } from './service/fast-form-builder';

export type TypedQuestion<PropType = unknown> = Omit<GeneralQuestion, 'type'> & { type: string };

export interface GeneralQuestion<PropType = unknown> {
  type?: string;
  id?: string;
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: PropType;
}

export interface InitialValue<T = unknown> {
  defaultValue?: T;
}


// ------ control
export type ControlBuilderDefinition<T = unknown> = TypedQuestion<T> & FormControlOptions;

// ------ group
export type GroupBuilderDefinition<T = unknown> = GeneralQuestion<T> & AbstractControlOptions;

// ------ array
export type ArrayBuilderDefinition<T = unknown> = GeneralQuestion<T> & AbstractControlOptions;


// ------ factory
export interface ControlFactoryOptions {
  //TODO: doc
  fb: FastFormBuilder;
  //TODO: doc
  validators: ValidatorFn[] | undefined | null;
  //TODO: doc
  asyncValidators: AsyncValidatorFn[] | undefined | null;
}

export type FactoryQuestionDefinition<PropType = unknown, DefaultType = unknown> =
    TypedQuestion<PropType> &
    FormControlOptions &
    InitialValue<DefaultType>;

export type ControlFactoryMethod = (question: FactoryQuestionDefinition, opts: ControlFactoryOptions) => AbstractControl;
