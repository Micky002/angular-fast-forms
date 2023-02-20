import { ControlFactoryMethod } from '../internal/control/models';
import { ControlDefinition, ControlWrapperKey, WrapperProvider } from '@ngx-fast-forms/core';
import { FormControl } from '@angular/forms';
import { ControlWrapperV2 } from '../internal/control-wrapper-v2';

export function staticControl(controlFactory: ControlFactoryMethod, question: ControlDefinition): FormControl {
  const formControl = controlFactory({...question}) as FormControl;
  (formControl as WrapperProvider)[ControlWrapperKey] = ControlWrapperV2.fromControl(question.defaultValue, question);
  return formControl;
}
