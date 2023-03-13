import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormControlState, FormGroup } from '@angular/forms';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { ControlFactoryV2 } from './control-factory-v2.service';
import { ArrayBuilderDefinition, ControlBuilderDefinition, GroupBuilderDefinition } from '../question-definition';


@Injectable({
  providedIn: 'any'
})
export class FastFormBuilder {

  constructor(private cf: ControlFactoryV2) {
  }


  public control<T = any>(state: FormControlState<T> | T, opts: ControlBuilderDefinition & { nonNullable: true }): FormControl<T>;
  public control<T = any>(state: FormControlState<T> | T, opts: ControlBuilderDefinition): FormControl<T | null>;
  public control<T = any>(state: FormControlState<T> | T, opts: ControlBuilderDefinition): FormControl<T> {
    return this.dynamicControl(state, opts) as FormControl<T>;
  }

  public controlGroup<T extends object>(
      state: T,
      opts: ControlBuilderDefinition
  ): FormGroup<{ [K in keyof T]: AbstractControl<T[K]> }> {
    return this.dynamicControl(state, opts) as FormGroup<{ [K in keyof T]: AbstractControl<T[K]> }>;
  }

  public dynamicControl<T = any>(state: FormControlState<T> | T, opts: ControlBuilderDefinition): AbstractControl {
    return this.cf.dynamicControl(state, opts);
  }

  /**
   * Experimental
   */
  public group<T extends object>(
      question: GroupBuilderDefinition,
      groupControls?: { [key: string]: AbstractControl }
  ): FormGroup<{ [K in keyof T]: AbstractControl<T[K]> }> {
    return this.cf.group({
      ...question,
      type: question.type ?? 'group-v2'
    }, groupControls);
  }

  /**
   * Experimental
   */
  public array<T>(question: ArrayBuilderDefinition, arrayQuestion?: AbstractControl<T>): FormArray<AbstractControl<T>> {
    return this.cf.array({
      ...question,
      type: question.type ?? 'array-v2'
    }, arrayQuestion);
  }

  /**
   * Experimental
   */
  newArrayEntry(array: FormArray): AbstractControl {
    if (hasControlWrapper(array)) {
      const wrapper = array[ControlWrapperKey];
      if (wrapper.controlType !== 'array') {
        throw new Error(`Cannot create array entry for component type [${wrapper.controlType}].`);
      }
      return this.cf.create(wrapper.arrayQuestion);
    } else {
      throw new Error(`Cannot create array entry when control is not created via [${FastFormBuilder.name}].`);
    }
  }
}


export const ControlWrapperKey = 'aff_wrapper';

export type WrapperProvider = (AbstractControl | FormGroup | FormControl | FormArray) & {
  [ControlWrapperKey]: ControlWrapperV2;
}

export function hasControlWrapper(control: object): control is WrapperProvider {
  return ControlWrapperKey in control;
}




