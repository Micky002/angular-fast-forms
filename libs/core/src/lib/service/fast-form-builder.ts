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
import { ControlRegistry } from '../internal/control/control-registry.service';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { ControlFactoryV2 } from './control-factory-v2.service';
import { QuestionProperties, ValidationOptions } from '../model';


export type GroupQuestion = GeneralQuestion & AbstractControlOptions & { type?: string };
export type TypedGroupQuestion = GeneralQuestion & AbstractControlOptions & { type: string };

export type ArrayQuestion = GeneralQuestion & AbstractControlOptions & { type?: string };
export type TypedArrayQuestion = GeneralQuestion & AbstractControlOptions & { type: string };

export type ControlQuestion = GeneralQuestion & FormControlOptions & { type: string };

export type AnyQuestion = ControlQuestion | TypedGroupQuestion | TypedArrayQuestion;

@Injectable()
export class FastFormBuilder {

  constructor(private cr: ControlRegistry,
              private cf: ControlFactoryV2) {
  }

  public control(state: FormControlState<any> | any, question: ControlQuestion): FormControl {
    return this.cf.control(state, question) as FormControl;
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

  newArrayEntry(array: WrapperProvider): AbstractControl {
    const wrapper = array[ControlWrapperKey];
    if (wrapper.controlType !== 'array') {
      throw new Error(`Cannot create array entry for component type [${wrapper.controlType}].`);
    }
    return this.cf.create(wrapper.arrayQuestion);
  }
}


export const ControlWrapperKey = 'aff_wrapper';

export type WrapperProvider = (AbstractControl | FormGroup | FormControl | FormArray) & {
  [ControlWrapperKey]: ControlWrapperV2;
}

export function hasControlWrapper(control: any): control is WrapperProvider {
  return ControlWrapperKey in control;
}

export interface GeneralQuestion {
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: QuestionProperties;
}
