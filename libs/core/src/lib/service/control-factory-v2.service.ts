import { Injectable } from '@angular/core';
import { ControlRegistry } from '../internal/control/control-registry.service';
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl,
  FormControlOptions,
  FormControlState,
  FormGroup
} from '@angular/forms';
import {
  AffFormArray,
  AffFormControl,
  AffFormGroup,
  ArrayQuestionKey,
  BasicQuestionV2,
  QuestionKey,
  QuestionWrapper
} from './fast-form-builder';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';

@Injectable({
  providedIn: 'root'
})
export class ControlFactoryV2 {

  constructor(private readonly cr: ControlRegistry) {
  }

  create(wrapper: ControlWrapperV2): AbstractControl {
    let control: AffFormControl | AffFormGroup | AffFormArray;
    switch (wrapper.controlType) {
      case 'control':
        control = this.control(wrapper.initialState, wrapper.question);
        break;
      case 'group':
        control = this.group(wrapper.question, wrapper.groupDef);
        break;
      case 'array':
        control = this.array(wrapper.arrayQuestion, wrapper.question);
        break;
    }
    control[QuestionWrapper] = wrapper;
    return control;
  }

  public group(question: BasicQuestionV2 & AbstractControlOptions, groupDef?: { [key: string]: any }): AffFormGroup {
    console.log('create group: ', groupDef);
    let group = new FormGroup<any>(groupDef, {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn
    }) as AffFormGroup;
    group[QuestionKey] = question;
    return group;
  }

  public control(state: FormControlState<any> | any, question: BasicQuestionV2 & FormControlOptions): AffFormControl {
    const control = new FormControl<any>(state, {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn,
      nonNullable: question.nonNullable
    }) as AffFormControl;
    control[QuestionKey] = question;
    return control;
  }

  array(arrayQuestion: BasicQuestionV2 & AbstractControlOptions, question: BasicQuestionV2 & FormControlOptions): AffFormArray;
  array(arrayQuestion: BasicQuestionV2 & AbstractControlOptions, question: BasicQuestionV2 & FormControlOptions & { nonNullable: true }): AffFormArray {
    // this.cr.g;
    const array = new FormArray<any>([], arrayQuestion) as AffFormArray;
    array[QuestionKey] = {
      ...arrayQuestion,
      type: arrayQuestion.type ?? 'array'
    };
    array[ArrayQuestionKey] = question;
    return array;
  }
}
