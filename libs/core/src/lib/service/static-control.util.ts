import { ControlFactoryMethod } from '../internal/control/models';
import { FormControl, FormControlState } from '@angular/forms';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';
import { ControlDefinition, ControlWrapperKey, WrapperProvider } from './fast-form-builder';


// type returnControl

export function staticControl<T = any>(state: FormControlState<T> | T, question: ControlDefinition & { nonNullable: true }, controlFactory?: ControlFactoryMethod): FormControl<T>;
export function staticControl<T = any>(state: FormControlState<T> | T, question: ControlDefinition, controlFactory?: ControlFactoryMethod): FormControl<T | null>;
export function staticControl<T = any>(state: FormControlState<T> | T, question: ControlDefinition, controlFactory?: ControlFactoryMethod): FormControl<T | null> {
  let formControl: FormControl<T | null>;
  if (controlFactory) {
    formControl = controlFactory({
      ...question,
      defaultValue: state
    }) as FormControl<T | null>;
  } else {
    formControl = new FormControl(state, question);
  }
  (formControl as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromControl(question.defaultValue, question);
  return formControl;
}
