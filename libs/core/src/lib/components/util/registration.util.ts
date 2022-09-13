import { Provider, Type } from '@angular/core';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, Question } from '../../model';
import { BaseFormControlComponent } from '../base/base-control.component';
import { BaseFormGroupComponent } from '../base/base-group.component';
import { FormGroup } from '@angular/forms';

export function registerControl(type: string, component: Type<BaseFormControlComponent<any, any>>): Provider {
  return {
    provide: DYNAMIC_FORM_CONTROL,
    useValue: {
      type,
      component
    } as DynamicFormDefinition,
    multi: true
  };
}

export function registerGroup(type: string, component: Type<BaseFormGroupComponent<any>>, options?: {
  groupFactory?: (question: Question) => FormGroup
}): Provider {
  return {
    provide: DYNAMIC_FORM_CONTROL,
    useValue: {
      type,
      component,
      controlFactory: options?.groupFactory
    } as DynamicFormDefinition,
    multi: true
  };
}