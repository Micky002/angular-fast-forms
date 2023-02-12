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
    const wrapper = ControlWrapperV2.fromControl(state, question);
    return this.cf.create(wrapper) as FormControl;
  }

  public group(question: GroupQuestion, groupDef?: { [key: string]: AbstractControl }): FormGroup {
    const groupQuestions: { [key: string]: AnyQuestion } = {};
    Object.keys(groupDef ?? {}).forEach(key => {
      groupQuestions[key] = this.deriveDefinition((groupDef ?? {})[key] as WrapperProvider) as AnyQuestion;
    });
    const wrapper = ControlWrapperV2.fromGroup({
      ...question,
      type: question.type ?? 'group'
    }, groupQuestions, groupDef);
    return this.cf.create(wrapper) as FormGroup;
  }

  array(question: ArrayQuestion, arrayQuestion: AbstractControl): FormArray {
    if (hasControlWrapper(arrayQuestion)) {
      // const array = new FormArray<any>([arrayQuestion], question) as AffFormArray;
      // array[QuestionKey] = {
      //   ...question,
      //   type: question.type ?? 'array'
      // };
      // array[ArrayQuestionKey] = {
      //   ...question,
      //   type: question.type ?? 'array'
      // };
      //
      // // array[QuestionWrapper] = arrayQuestion[QuestionWrapper];
      // array[QuestionWrapper] = ControlWrapperV2.fromArray({
      //   ...question,
      //   type: question.type ?? 'array'
      // }, this.deriveDefinition(arrayQuestion) as AnyQuestion);
      // return array;
      const wrapper = ControlWrapperV2.fromArray({
        ...question,
        type: question.type ?? 'array'
      }, this.deriveDefinition(arrayQuestion) as QuestionV2);
      const formArray = this.cf.create(wrapper) as FormArray;
      formArray.push(arrayQuestion);
      return formArray;
    } else {
      throw new Error(`Control is not created with [${FastFormBuilder.name}].`);
    }
  }

  newArrayEntry(array: WrapperProvider): AbstractControl {
    const wrapper = array[QuestionWrapper];
    console.log(wrapper);
    if (wrapper.controlType !== 'array') {
      throw new Error(`Cannot create array entry for component type [${wrapper.controlType}].`);
    }
    // const def = this.cr.getDefinition(wrapper.arrayQuestion.type);
    // if (this.controlRegistry.hasControlFactory(question.type)) {
    //   const def = this.controlRegistry.getDefinition(question.type);
    //   if (def.controlFactory !== undefined) {
    //     return def.controlFactory(question);
    //   }
    // }
    // return undefined;


    if (hasControlWrapper(array)) {
      const question = array[QuestionWrapper].question;

    }
    // return this.cf.;
    return null as any;
  }

  public deriveDefinition(control: AbstractControl): { [key: string]: AnyQuestion } | AnyQuestion | AnyQuestion[] {
    if (!hasControlWrapper(control)) {
      throw new Error('asdf');
    }
    const wrapper = control[QuestionWrapper];
    if (wrapper.controlType === 'control') {
      return wrapper.question;
    } else if (wrapper.controlType === 'group') {
      // const asdf: { [key: string]: AnyQuestion } = {};
      // Object.keys(wrapper.groupDef).forEach(key => {
      //   asdf[key] = this.deriveDefinition(wrapper.groupDef[key] as WrapperProvider) as AnyQuestion;
      // });
      return [wrapper.question, wrapper.groupQuestion];
    } else if (wrapper.controlType === 'array') {
      return [wrapper.question, wrapper.arrayQuestion];
    } else {
      throw new Error('asdf');
    }
  }
}


export const QuestionWrapper = 'aff_wrapper';

export type WrapperProvider = AbstractControl & {
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
