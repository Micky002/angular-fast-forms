import { Injectable } from '@angular/core';
import { ControlRegistry } from '../internal/control/control-registry.service';
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl,
  FormControlState,
  FormGroup
} from '@angular/forms';
import {
  BasicQuestionV2,
  ControlQuestion,
  GroupQuestion,
  hasControlWrapper,
  QuestionWrapper,
  WrapperProvider
} from './fast-form-builder';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';

@Injectable({
  providedIn: 'root'
})
export class ControlFactoryV2 {

  constructor(private readonly cr: ControlRegistry) {
  }

  create(wrapper: ControlWrapperV2): AbstractControl {
    switch (wrapper.controlType) {
      case 'control':
        return this.control(wrapper.initialState, wrapper.question);
      case 'group':
        return this.group(wrapper.question, this.createSubGroupControls(wrapper.groupQuestion));
      case 'array':
        return this.array(wrapper.question, this.create(wrapper.arrayQuestion));
    }
  }

  public control(state: FormControlState<any> | any, question: ControlQuestion): FormControl {
    const control = new FormControl<any>(state, {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn,
      nonNullable: question.nonNullable
    });
    (control as WrapperProvider)[QuestionWrapper] = ControlWrapperV2.fromControl(state, question);
    return control;
  }

  public group(question: GroupQuestion, groupControls?: { [key: string]: AbstractControl }): FormGroup {
    const group = new FormGroup<any>(groupControls ?? {}, {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn
    });

    const groupQuestions: { [key: string]: ControlWrapperV2 } = {};
    Object.keys(groupControls ?? {}).forEach(key => {
      groupQuestions[key] = this.deriveDefinition((groupControls ?? {})[key]);
    });
    (group as WrapperProvider)[QuestionWrapper] = ControlWrapperV2.fromGroup(question, groupQuestions);
    return group;
  }

  public array(question: BasicQuestionV2 & AbstractControlOptions, arrayQuestion: AbstractControl): FormArray {
    // this.cr.g;
    const array = new FormArray<any>([], {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn
    });
    (array as WrapperProvider)[QuestionWrapper] = ControlWrapperV2.fromArray(question, this.deriveDefinition(arrayQuestion));
    return array;
  }

  public deriveDefinition(control: AbstractControl): ControlWrapperV2 {
    if (!hasControlWrapper(control)) {
      throw new Error('asdf');
    }
    const wrapper = control[QuestionWrapper];
    if (wrapper.controlType === 'control') {
      return wrapper;
    } else if (wrapper.controlType === 'group') {
      return wrapper;
    } else if (wrapper.controlType === 'array') {
      return wrapper;
    } else {
      throw new Error('asdf');
    }
  }

  private createSubGroupControls(groupQuestions: { [key: string]: ControlWrapperV2 }): { [key: string]: AbstractControl } {
    const groupDef: { [key: string]: AbstractControl } = {};
    Object.keys(groupQuestions).forEach(key => {
      groupDef[key] = this.create(groupQuestions[key]);
    });
    return groupDef;
  }
}
