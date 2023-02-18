import { Injectable } from '@angular/core';
import { ControlRegistry } from '../internal/control/control-registry.service';
import { AbstractControl, FormArray, FormControl, FormControlState, FormGroup } from '@angular/forms';
import {
  ControlQuestion,
  ControlWrapperKey,
  FastFormBuilder,
  hasControlWrapper,
  TypedArrayQuestion,
  TypedGroupQuestion,
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
    (control as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromControl(state, question);
    return control;
  }

  public group(question: TypedGroupQuestion, groupControls?: { [key: string]: AbstractControl }): FormGroup {
    const group = new FormGroup<any>(groupControls ?? {}, {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn
    });

    const groupQuestions: { [key: string]: ControlWrapperV2 } = {};
    Object.keys(groupControls ?? {}).forEach(key => {
      groupQuestions[key] = this.deriveDefinition((groupControls ?? {})[key]);
    });
    (group as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromGroup(question, groupQuestions);
    return group;
  }

  public array(question: TypedArrayQuestion, arrayQuestion?: AbstractControl): FormArray {
    const array = new FormArray<any>([], {
      validators: question.validators,
      asyncValidators: question.asyncValidators,
      updateOn: question.updateOn
    });
    if (arrayQuestion) {
      (array as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromArray(question, this.deriveDefinition(arrayQuestion));
    } else {
      (array as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromArray(question);
    }
    return array;
  }

  public deriveDefinition(control: AbstractControl): ControlWrapperV2 {
    if (!hasControlWrapper(control)) {
      throw new Error(`Cannot create control which is not created via the [${FastFormBuilder.name}].`);
    }
    const wrapper = control[ControlWrapperKey];
    if (wrapper.controlType === 'control') {
      return wrapper;
    } else if (wrapper.controlType === 'group') {
      return wrapper;
    } else if (wrapper.controlType === 'array') {
      return wrapper;
    } else {
      throw new Error(`The control type [${wrapper.controlType}]} is not supported.`);
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
