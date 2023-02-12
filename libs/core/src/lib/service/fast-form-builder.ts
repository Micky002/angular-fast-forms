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
export type ControlQuestion = BasicQuestionV2 & FormControlOptions;
export type ArrayQuestion = BasicQuestionV2 & AbstractControlOptions;
export type AnyQuestion = ControlQuestion | GroupQuestion | ArrayQuestion;

@Injectable()
export class FastFormBuilder {

  constructor(private cr: ControlRegistry,
              private cf: ControlFactoryV2) {
  }

  public group(question: GroupQuestion, groupDef?: { [key: string]: AbstractControl }): FormGroup {
    const wrapper = ControlWrapperV2.fromGroup({
      ...question,
      type: question.type ?? 'group'
    }, groupDef);
    return this.cf.create(wrapper) as FormGroup;
  }

  public control(state: FormControlState<any> | any, question: ControlQuestion): FormControl {
    const wrapper = ControlWrapperV2.fromControl(state, question);
    return this.cf.create(wrapper) as FormControl;
  }

  array(arrayQuestion: ArrayQuestion, question: AbstractControl): FormArray {
    if (hasControlWrapper(question)) {
      const array = new FormArray<any>([question], arrayQuestion) as AffFormArray;
      array[QuestionKey] = {
        ...arrayQuestion,
        type: arrayQuestion.type ?? 'array'
      };
      array[ArrayQuestionKey] = {
        ...arrayQuestion,
        type: arrayQuestion.type ?? 'array'
      };

      array[QuestionWrapper] = question[QuestionWrapper];
      return array;
    } else {
      throw new Error(`Control is not created with [${FastFormBuilder.name}].`);
    }
  }

  newArrayEntry(array: WrapperProvider): AbstractControl {
    if (hasControlWrapper(array)) {
      const question = array[QuestionWrapper].question;

    }
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
      const asdf: { [key: string]: AnyQuestion } = {};
      Object.keys(wrapper.groupDef).forEach(key => {
        asdf[key] = this.deriveDefinition(wrapper.groupDef[key] as WrapperProvider) as AnyQuestion;
      });
      return asdf;
    } else if (wrapper.controlType === 'array') {
      return [wrapper.arrayQuestion];
    } else {
      throw new Error('asdf');
    }
  }
}


export const QuestionKey = 'affque';
export const QuestionWrapper = 'aff_wrapper';
export const ArrayQuestionKey = 'affaque';

export type AffFormControl = FormControl & WrapperProvider & {
  [QuestionKey]: BasicQuestionV2;
}

export type AffFormGroup = FormGroup & WrapperProvider & {
  [QuestionKey]: BasicQuestionV2;
}

export type AffFormArray = FormArray & WrapperProvider & {
  [QuestionKey]: BasicQuestionV2;
  [ArrayQuestionKey]: BasicQuestionV2;
}

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
