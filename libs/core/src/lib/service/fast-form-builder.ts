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

@Injectable()
export class FastFormBuilder {

  constructor(private cr: ControlRegistry,
              private cf: ControlFactoryV2) {
  }

  public group(question: BasicQuestionV2 & AbstractControlOptions, groupDef?: { [key: string]: any }): FormGroup {
    const wrapper = ControlWrapperV2.fromGroup({
      ...question,
      type: question.type ?? 'group'
    }, groupDef);
    return this.cf.create(wrapper) as FormGroup;
  }

  public control(state: FormControlState<any> | any, question: BasicQuestionV2 & FormControlOptions): FormControl {
    const wrapper = ControlWrapperV2.fromControl(state, question);
    return this.cf.create(wrapper) as FormControl;
  }

  array(arrayQuestion: BasicQuestionV2 & AbstractControlOptions, question: AbstractControl): FormArray {
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
