import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl,
  FormControlOptions,
  FormControlState,
  FormGroup
} from '@angular/forms';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { ControlFactoryV2 } from './control-factory-v2.service';
import { ValidationOptions } from '../model';


export type GroupQuestion = GeneralQuestion & AbstractControlOptions & { type?: string };
export type TypedGroupQuestion = GeneralQuestion & AbstractControlOptions & { type: string };
export type GroupDefinition = GeneralQuestion & FormControlOptions & { type: string } & InitialValue;

export type ArrayQuestion = GeneralQuestion & AbstractControlOptions & { type?: string };
export type TypedArrayQuestion = GeneralQuestion & AbstractControlOptions & { type: string };

// export type ControlQuestion = GeneralQuestion & FormControlOptions & { type: string };
export type ControlDefinition<T = unknown> = TypedGeneralQuestion<T> & FormControlOptions & InitialValue;

export type AnyQuestion = TypedGeneralQuestion & (FormControlOptions | AbstractControlOptions);
export type TypedGeneralQuestion<T = unknown> = GeneralQuestion<T> & { type: string };

@Injectable({
  providedIn: 'any'
})
export class FastFormBuilder {

  constructor(private cf: ControlFactoryV2) {
  }

  public control<T = any>(state: FormControlState<T> | T, opts: FormControlOptions & GeneralQuestion & { type: string } & { id?: string }): AbstractControl {
    return this.cf.control(state, opts);
  }

  public group(question: GroupQuestion, groupControls?: { [key: string]: AbstractControl }): FormGroup {
    return this.cf.group({
      ...question,
      type: question.type ?? 'group-v2'
    }, groupControls);
  }

  public array(question: ArrayQuestion, arrayQuestion?: AbstractControl): FormArray {
    return this.cf.array({
      ...question,
      type: question.type ?? 'array-v2'
    }, arrayQuestion);
  }

  newArrayEntry(array: FormArray): AbstractControl {
    if (hasControlWrapper(array)) {
      const wrapper = array[ControlWrapperKey];
      if (wrapper.controlType !== 'array') {
        throw new Error(`Cannot create array entry for component type [${wrapper.controlType}].`);
      }
      return this.cf.create(wrapper.arrayQuestion);
    } else {
      throw new Error(`Cannot create array entry when control is not created via [${FastFormBuilder.name}].`);
    }
  }
}


export const ControlWrapperKey = 'aff_wrapper';

export type WrapperProvider = (AbstractControl | FormGroup | FormControl | FormArray) & {
  [ControlWrapperKey]: ControlWrapperV2;
}

export function hasControlWrapper(control: object): control is WrapperProvider {
  return ControlWrapperKey in control;
}

export interface InitialValue {
  defaultValue?: unknown;
}

export interface GeneralQuestion<T = unknown> {
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: T;
}
