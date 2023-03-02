import { Injectable } from '@angular/core';
import { ControlRegistry } from '../internal/control/control-registry.service';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormControlOptions,
  FormControlState,
  FormGroup
} from '@angular/forms';
import {
  ControlWrapperKey,
  FastFormBuilder,
  GeneralQuestion,
  hasControlWrapper,
  TypedArrayQuestion,
  TypedGroupQuestion,
  WrapperProvider
} from './fast-form-builder';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { ValidationOptions } from '../model';

//TODO: Check if introducing circ dependency with FastFormBuilder is best solution
//Possible solution: Add static control enhancement method to add wrapper to control
@Injectable({
  providedIn: 'any'
})
export class ControlFactoryV2 {

  constructor(private readonly validatorFactory: ValidatorFactoryService,
              private readonly cr: ControlRegistry) {
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

  public control(state: FormControlState<any> | any, question: FormControlOptions & GeneralQuestion & { type: string }): AbstractControl {
    let control: AbstractControl;
    const controlFactory = this.cr.getControlFactory(question.type);
    if (controlFactory) {
      control = controlFactory({
        ...question,
        defaultValue: state
      }, {
        fb: new FastFormBuilder(this)
      });
    } else {
      control = new FormControl<any>(state, {
        validators: question.validators,
        asyncValidators: question.asyncValidators,
        updateOn: question.updateOn,
        nonNullable: question.nonNullable
      });
    }
    this.addValidators(control, question.validation);
    (control as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromControl(state, question);
    return control;
  }

  public group(question: TypedGroupQuestion, groupControls?: { [key: string]: AbstractControl }): FormGroup {
    const controlFactory = this.cr.getControlFactory(question.type);
    let group: FormGroup;
    if (controlFactory) {
      group = controlFactory({
        ...question
      }, {
        fb: new FastFormBuilder(this)
      }) as FormGroup;
    } else {
      group = new FormGroup<any>(groupControls ?? {}, {
        validators: question.validators,
        asyncValidators: question.asyncValidators,
        updateOn: question.updateOn
      });
    }

    const groupQuestions: { [key: string]: ControlWrapperV2 } = {};
    Object.keys(groupControls ?? {}).forEach(key => {
      groupQuestions[key] = this.deriveDefinition((groupControls ?? {})[key]);
    });
    this.addValidators(group, question.validation);
    (group as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromGroup(question, groupQuestions);
    return group;
  }

  public array(question: TypedArrayQuestion, arrayQuestion?: AbstractControl): FormArray {
    const controlFactory = this.cr.getControlFactory(question.type);
    let array: FormArray;
    if (controlFactory) {
      array = controlFactory({
        ...question
      }, {
        fb: new FastFormBuilder(this)
      }) as FormArray;
    } else {
      array = new FormArray<any>([], {
        validators: question.validators,
        asyncValidators: question.asyncValidators,
        updateOn: question.updateOn
      });
    }
    this.addValidators(array, question.validation);
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

  private addValidators(control: AbstractControl, opts?: ValidationOptions) {
    if (opts) {
      const syncValidators = this.validatorFactory.createValidators(opts);
      if (syncValidators) {
        control.addValidators(syncValidators);
      }
      const asyncValidators = this.validatorFactory.createAsyncValidators(opts);
      if (asyncValidators) {
        control.addAsyncValidators(asyncValidators);
      }
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
