import { Inject, Injectable, Optional, ViewContainerRef } from '@angular/core';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, Question } from '../model';
import { FastFormInline } from '../control/abstract-inline';
import { FastFormControl } from '@ngx-fast-forms/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FastFormArrayAsdf } from '../control/abstract-array';
import { FastFormArray } from '../control/fast-form-array';

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
    // console.log('render', formGroup);
    // console.log('component', dynamicFormControlRef.instance);
    this.createAndInitComponent(formGroup, question, dynamicFormControlRef.instance);
    // if (formDefinition.inline) {
    //   const component = dynamicFormControlRef.instance as FastFormInline;
    //   component.formGroup = formGroup;
    //   component.questions = question.children || [];
    // } else {
    //   const component = dynamicFormControlRef.instance as FastFormControl;
    //   component.formGroup = formGroup;
    //   component.question = question;
    //   component.control = formGroup.controls[question.id];
    //   component.properties = question?.properties || {};
    // }
  }

  // TODO better type check
  private createAndInitComponent(formGroup: FormGroup | FormArray, question: Question, component: FastFormArrayAsdf | FastFormInline | FastFormControl) {
    if (component instanceof FastFormArrayAsdf) {
      const arrayComponent = component as FastFormArrayAsdf;// const component = dynamicFormControlRef.instance as FastFormControl;
      arrayComponent.formGroup = formGroup as FormGroup;
      arrayComponent.formArray = (formGroup as FormGroup).controls[question.id] as FastFormArray;
      arrayComponent.formArrayName = question?.id;
      arrayComponent.question = (question.children ?? [])[0];
      arrayComponent.properties = question?.properties ?? {};
      // arrayComponent.questions = question.children || [];
    } else if (component instanceof FastFormInline) {
      const inlineComponent = component as FastFormInline;// const component = dynamicFormControlRef.instance as FastFormControl;
      inlineComponent.formGroup = formGroup as FormGroup;
      inlineComponent.questions = question.children ?? [];
    } else if (component instanceof FastFormControl) {
      const controlComponent = component as FastFormControl;// const component = dynamicFormControlRef.instance as FastFormControl;
      controlComponent.formGroup = formGroup as FormGroup;
      controlComponent.question = question;
      console.log(question.id);
      if (formGroup instanceof FormArray) {
        console.log('form array');
      } else if (formGroup instanceof FormControl) {
        console.log('form control');
      } else {
        console.log('form group');
      }
      controlComponent.control = (formGroup as FormGroup).controls[question.id];
      controlComponent.properties = question?.properties ?? {};
      console.log(controlComponent.control);
    }
  }
}
