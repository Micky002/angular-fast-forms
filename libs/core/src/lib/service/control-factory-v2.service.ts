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
import { BasicQuestionV2, QuestionWrapper, WrapperProvider } from './fast-form-builder';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';

@Injectable({
  providedIn: 'root'
})
export class ControlFactoryV2 {

  constructor(private readonly cr: ControlRegistry) {
  }

  create(wrapper: ControlWrapperV2): AbstractControl {
    let control: AbstractControl;
    switch (wrapper.controlType) {
      case 'control':
        control = this.control(wrapper.initialState, wrapper.question);
        break;
      case 'group':
        control = this.group(wrapper.question, wrapper.groupControls);
        break;
      case 'array':
        control = this.array(wrapper.question, wrapper.arrayQuestion);
        break;
    }
    (control as WrapperProvider)[QuestionWrapper] = wrapper;
    return control;
  }

  public group(question: BasicQuestionV2 & AbstractControlOptions, groupDef?: { [key: string]: any }): FormGroup {
    return new FormGroup<any>(groupDef, {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn
    });
  }

  public control(state: FormControlState<any> | any, question: BasicQuestionV2 & FormControlOptions): FormControl {
    return new FormControl<any>(state, {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn,
      nonNullable: question.nonNullable
    });
  }

  public array(question: BasicQuestionV2 & AbstractControlOptions, arrayQuestion: BasicQuestionV2 & FormControlOptions): FormArray {
    // this.cr.g;
    return new FormArray<any>([], {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn
    });
  }
}
