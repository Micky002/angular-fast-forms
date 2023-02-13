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
import { QuestionProperties, ValidationOptions } from '@ngx-fast-forms/core';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { ControlFactoryV2 } from './control-factory-v2.service';


export type GroupQuestion = BasicQuestionV2 & AbstractControlOptions;
export type ControlQuestion = GeneralQuestion & FormControlOptions & { type: string };
export type ArrayQuestion = BasicQuestionV2 & AbstractControlOptions;
export type AnyQuestion = ControlQuestion | GroupQuestion | ArrayQuestion;

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
      type: question.type ?? 'group'
    }, groupControls);
  }

  array(question: ArrayQuestion, arrayQuestion: AbstractControl): FormArray {
    return this.cf.array({
      ...question,
      type: question.type ?? 'array'
    }, arrayQuestion);
  }

  newArrayEntry(array: WrapperProvider): AbstractControl {
    const wrapper = array[QuestionWrapper];
    if (wrapper.controlType !== 'array') {
      throw new Error(`Cannot create array entry for component type [${wrapper.controlType}].`);
    }
    return this.cf.create(wrapper.arrayQuestion);
  }
}


export const QuestionWrapper = 'aff_wrapper';

export type WrapperProvider = (AbstractControl | FormGroup | FormControl | FormArray) & {
  [QuestionWrapper]: ControlWrapperV2;
}

export function hasControlWrapper(control: any): control is WrapperProvider {
  return QuestionWrapper in control;
}

export interface BasicQuestionV2 {
  type?: string;
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: QuestionProperties;
}

export interface GeneralQuestion {
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: QuestionProperties;
}

export interface QuestionV2 {
  type: string;
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: QuestionProperties;
}
