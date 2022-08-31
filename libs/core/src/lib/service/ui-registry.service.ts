import { Inject, Injectable, Optional, ViewContainerRef } from '@angular/core';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, Question } from '../model';
import { BaseFormInlineComponent } from '../components/base/base-inline.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseFormArrayComponent } from '../components/base/base-array.component';
import { FastFormArray } from '../control/fast-form-array';
import { BaseFormControlComponent } from '../components/base/base-control.component';

@Injectable({
  providedIn: 'any'
})
export class UiRegistryService {

  private uiComponents: { [key: string]: DynamicFormDefinition } = {};

  constructor(@Optional() @Inject(DYNAMIC_FORM_CONTROL) private controlDefinitions?: Array<DynamicFormDefinition>) {
    if (controlDefinitions) {
      controlDefinitions.forEach(cd => {
        if (this.uiComponents[cd.type]) {
          throw new Error(`Ui component with type [${cd.type}] already registered.`);
        }
        this.uiComponents[cd.type] = cd;
      });
    }
  }

  find(type: string): DynamicFormDefinition | undefined {
    const uiComponent = this.uiComponents[type];
    if (!uiComponent) {
      console.warn(`No ui component registered with type [${type}].`);
    }
    return uiComponent;
  }

  render(viewContainerRef: ViewContainerRef, formGroup: FormGroup | FormArray | FormControl, question: Question, formDefinition: DynamicFormDefinition) {
    const dynamicFormControlRef = viewContainerRef.createComponent(formDefinition.component);
    this.initializeComponent(formGroup, question, dynamicFormControlRef.instance);
  }

  // TODO better type check
  private initializeComponent(control: FormGroup | FormArray | FormControl, question: Question, component: BaseFormArrayComponent | BaseFormInlineComponent | BaseFormControlComponent) {
    if (component instanceof BaseFormArrayComponent && control instanceof FormGroup) {
      this.initializeFormArrayComponent(control, question, component);
    } else if (component instanceof BaseFormInlineComponent && control instanceof FormGroup) {
      this.initializeFormInlineComponent(control, question, component);
    } else if (component instanceof BaseFormControlComponent && (control instanceof FormGroup || control instanceof FormControl)) {
      this.initializeFormControlComponent(control, question, component);
    } else {
      throw new Error(`Cannot create component of type [${typeof component}] with control of type [${typeof control}] for question with id [${question.id}]`);
    }
  }

  private initializeFormArrayComponent(formGroup: FormGroup, question: Question, component: BaseFormArrayComponent) {
    component.formArray = formGroup.controls[question.id] as FastFormArray;
    const formChildren = question.children ?? [];
    if (formChildren.length > 1) {
      throw new Error('Only one children is allowed in a form array.');
    }
    if (formChildren.length === 0) {
      console.warn(`No question registered in form array [${question.id}].`);
    } else {
      component.question = formChildren[0];
    }
    component.properties = question?.properties ?? {};
  }

  private initializeFormInlineComponent(control: FormGroup, question: Question, component: BaseFormInlineComponent) {
    component.formGroup = control;
    component.questions = question.children ?? [];
  }

  private initializeFormControlComponent(control: FormGroup | FormControl, question: Question, component: BaseFormControlComponent) {
    if (control instanceof FormGroup) {
      component.formGroup = control;
      component.control = control.controls[question.id];
    } else {
      component.control = control;
    }
    component.question = question;
    component.properties = question?.properties ?? {};
  }
}
