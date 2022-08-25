import { Inject, Injectable, Optional, ViewContainerRef } from '@angular/core';
import { DynamicFormDefinition, DYNAMIC_FORM_CONTROL, Question } from '../model';
import { FastFormInline } from '../control/abstract-inline';
import { FastFormControl } from '@ngx-fast-forms/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'any'
})
export class UiRegistryService {

  private uiComponents: {[key: string]: DynamicFormDefinition} = {};

  constructor(@Optional() @Inject(DYNAMIC_FORM_CONTROL) private controlDefinitions?: Array<DynamicFormDefinition>) {
    if (controlDefinitions) {
      controlDefinitions.forEach(cd => {
        if (this.uiComponents[cd.type]) {
          throw new Error(`Ui component with type [${cd.type}] already registered.`)
        }
        this.uiComponents[cd.type] = cd;
      })
    }
  }

  find(type: string): DynamicFormDefinition | undefined {
    const uiComponent = this.uiComponents[type];
    if (!uiComponent) {
      console.warn(`No ui component registered with type [${type}].`)
    }
    return uiComponent;
  }

  render(viewContainerRef: ViewContainerRef, formGroup: FormGroup, question: Question, formDefinition: DynamicFormDefinition) {
    const dynamicFormControlRef = viewContainerRef.createComponent(formDefinition.component);
    if (formDefinition.inline) {
      const component = dynamicFormControlRef.instance as FastFormInline;
      component.formGroup = formGroup;
      component.questions = question.children || [];
    } else {
      const component = dynamicFormControlRef.instance as FastFormControl;
      component.formGroup = formGroup;
      component.question = question;
      component.control = formGroup.controls[question.id];
      component.properties = question?.properties || {};
    }
  }
}
