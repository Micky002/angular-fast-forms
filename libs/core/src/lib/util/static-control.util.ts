import { FormControl, FormControlState } from '@angular/forms';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { ControlDefinition, ControlWrapperKey, WrapperProvider } from '../service/fast-form-builder';
import { Type } from '@angular/core';
import { getControlFactory } from '../internal/util/component.util';


// type returnControl

export function staticControl<T = any>(state: FormControlState<T> | T, question: ControlDefinition & { nonNullable: true }, controlComponent?: Type<unknown>): FormControl<T>;
export function staticControl<T = any>(state: FormControlState<T> | T, question: ControlDefinition, controlComponent?: Type<unknown>): FormControl<T | null>;
export function staticControl<T = any>(state: FormControlState<T> | T, question: ControlDefinition, controlComponent?: Type<unknown>): FormControl<T | null> {
  let formControl: FormControl<T | null> | null = null;
  if (controlComponent) {
    const controlFactory = getControlFactory(controlComponent);
    if (controlFactory) {
      formControl = controlFactory({
        ...question,
        defaultValue: state
      }) as FormControl<T | null>;
    }
  }
  if (!formControl) {
    formControl = new FormControl(state, question);
  }
  (formControl as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromControl(question.defaultValue, question);
  return formControl;
}
