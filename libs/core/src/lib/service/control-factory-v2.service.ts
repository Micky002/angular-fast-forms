import { Injectable } from '@angular/core';
import { ControlRegistry } from '../internal/control/control-registry.service';
import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormControlOptions,
  FormControlState,
  FormGroup,
  ValidatorFn
} from '@angular/forms';
import { ControlWrapperKey, FastFormBuilder, hasControlWrapper, WrapperProvider } from './fast-form-builder';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { ValidationOptions } from '../model';
import { ValidatorFunctionType, ValidatorType } from '../validation/symbols';
import { ControlFactoryMethod, TypedQuestion } from '../question-definition';

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
        return this.dynamicControl(wrapper.initialState, wrapper.question);
      case 'group':
        return this.group(wrapper.question, this.createSubGroupControls(wrapper.groupQuestion));
      case 'array':
        return this.array(wrapper.question, this.create(wrapper.arrayQuestion));
    }
  }

  public control<T>(state: FormControlState<T> | T, question: TypedQuestion<T> & FormControlOptions & { nonNullable: true }): FormControl<T>;
  public control<T>(state: FormControlState<T> | T, question: TypedQuestion<T> & FormControlOptions): FormControl<T | null>;
  public control<T>(state: FormControlState<T> | T, question: TypedQuestion<T> & FormControlOptions): FormControl<T> {
    return this.dynamicControl(state, question) as FormControl<T>;
  }

  public dynamicControl(state: FormControlState<any> | any, question: TypedQuestion & FormControlOptions): AbstractControl {
    let control: AbstractControl;
    const controlFactory = this.cr.getControlFactory(question.type);
    if (controlFactory) {
      control = this.createViaFactoryMethod(controlFactory, question, state);
    } else {
      control = new FormControl(state, {
        ...this.createValidators(question),
        updateOn: question.updateOn,
        nonNullable: question.nonNullable
      });
    }
    (control as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromControl(state, question);
    return control;
  }

  public group(question: TypedQuestion & AbstractControlOptions, groupControls?: { [key: string]: AbstractControl }): FormGroup {
    const controlFactory = this.cr.getControlFactory(question.type);
    let group: FormGroup;
    if (controlFactory) {
      group = this.createViaFactoryMethod(controlFactory, question) as FormGroup;
    } else {
      group = new FormGroup<any>(groupControls ?? {}, {
        ...this.createValidators(question),
        updateOn: question.updateOn
      });
    }

    const groupQuestions: { [key: string]: ControlWrapperV2 } = {};
    Object.keys(groupControls ?? {}).forEach(key => {
      const childControl = this.deriveDefinition(null, (groupControls ?? {})[key]);
      if (!childControl.question.id) {
        childControl.question.id = key;
      }
      groupQuestions[key] = childControl;
    });
    (group as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromGroup(question, groupQuestions);
    return group;
  }

  public array(question: TypedQuestion & AbstractControlOptions, arrayQuestion?: AbstractControl): FormArray {
    const controlFactory = this.cr.getControlFactory(question.type);
    let array: FormArray;
    if (controlFactory) {
      array = this.createViaFactoryMethod(controlFactory, question) as FormArray;
    } else {
      array = new FormArray<any>([], {
        ...this.createValidators(question),
        updateOn: question.updateOn
      });
    }
    if (arrayQuestion) {
      (array as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromArray(question, this.deriveDefinition(null, arrayQuestion));
    } else {
      (array as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromArray(question);
    }
    return array;
  }

  public deriveDefinition(key: string | null, control: AbstractControl): ControlWrapperV2 {
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

  private createValidators(question: { validation?: ValidationOptions } & FormControlOptions): {
    validators: ValidatorFn[] | null,
    asyncValidators: AsyncValidatorFn[] | null
  } {
    return {
      validators: this.createValidatorsByType('sync', question.validators, question.validation),
      asyncValidators: this.createValidatorsByType('async', question.asyncValidators, question.validation)
    };
  }

  private createValidatorsByType<T extends ValidatorType>(
      type: T,
      validators: ValidatorFunctionType[T] | ValidatorFunctionType[T][] | null | undefined,
      opts?: ValidationOptions
  ): ValidatorFunctionType[T][] | null {
    const combinedValidators: ValidatorFunctionType[T][] = [];
    if (validators) {
      if (validators instanceof Array) {
        validators.forEach(v => combinedValidators.push(v));
      } else {
        combinedValidators.push(validators);
      }
    }
    if (opts) {
      if (type === 'sync') {
        combinedValidators.push(...this.validatorFactory.createValidators(opts) as any);
      } else if (type === 'async') {
        combinedValidators.push(...this.validatorFactory.createAsyncValidators(opts));
      }
    }
    if (combinedValidators.length === 0) {
      return null;
    } else {
      return combinedValidators;
    }
  }

  private createSubGroupControls(groupQuestions: { [key: string]: ControlWrapperV2 }): { [key: string]: AbstractControl } {
    const groupDef: { [key: string]: AbstractControl } = {};
    Object.keys(groupQuestions).forEach(key => {
      groupDef[key] = this.create(groupQuestions[key]);
    });
    return groupDef;
  }

  private createViaFactoryMethod(method: ControlFactoryMethod, question: TypedQuestion, defaultValue?: any): AbstractControl {
    return method({
      ...question,
      defaultValue: defaultValue
    }, {
      ...this.createValidators(question),
      fb: new FastFormBuilder(this)
    });
  }
}
