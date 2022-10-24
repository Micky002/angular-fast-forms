import { ComponentRef, Inject, Injectable, Injector, Optional, ViewContainerRef } from '@angular/core';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, Question } from '../model';
import { BaseFormInlineComponent } from '../components/base/base-inline.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseFormArrayComponent } from '../components/base/base-array.component';
import { FastFormArray } from '../control/fast-form-array';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { BaseFormGroupComponent } from '../components/base/base-group.component';
import { ControlRegistry } from '../internal/control/control-registry.service';
import { CONTROL_ID, CONTROL_PROPERTIES } from '../components/util/inject-token';
import { ActionService } from '../actions/action.service';
import { InternalControlDefinition, InternalControlType } from '../internal/models';
import { ControlIdImpl } from '../internal/control/control-id-impl';
import { ArrayIndexDirective } from '../internal/action/array-index.directive';
import { FastFormControl } from '../control/fast-form-control';
import { FastFormGroup } from '../control/fast-form-group';

@Injectable({
  providedIn: 'any'
})
export class UiRegistryService {

  private uiComponents: { [key: string]: DynamicFormDefinition } = {};

  constructor(private controlRegistry: ControlRegistry,
              private injector: Injector,
              @Optional() @Inject(DYNAMIC_FORM_CONTROL) private controlDefinitions?: Array<DynamicFormDefinition>) {
    if (controlDefinitions) {
      controlDefinitions.forEach(cd => {
        if (this.uiComponents[cd.type]) {
          throw new Error(`Ui component with type [${cd.type}] already registered.`);
        }
        this.uiComponents[cd.type] = cd;
      });
    }
  }

  isControl(controlId: string): boolean {
    return !!this.findControl(controlId);
  }

  findControl(controlId: string): DynamicFormDefinition | null {
    return this.find(controlId, 'control') ?? null;
  }

  find(controlId: string, type?: InternalControlType): DynamicFormDefinition | null {
    if (type === undefined) {
      return this.findLegacyFormControl(controlId) ?? this._findControl(controlId);
    } else if (type === 'control') {
      return this.findLegacyFormControl(controlId) ?? this._findControl(controlId, 'control');
    } else {
      return this._findControl(controlId, type);
    }
  }

  render<T>(viewContainerRef: ViewContainerRef,
            formGroup: FormGroup | FormArray | FormControl,
            question: Question,
            formDefinition: DynamicFormDefinition,
            injector: Injector,
            actionService?: ActionService,
            indexDirective?: ArrayIndexDirective): ComponentRef<T> {
    const id = injector.get<ControlIdImpl>(CONTROL_ID, new ControlIdImpl());
    const controlComponentRef = viewContainerRef.createComponent(formDefinition.component, {
      injector: Injector.create({
        providers: [{
          provide: CONTROL_PROPERTIES,
          useValue: question.properties ?? {}
        }, {
          provide: CONTROL_ID,
          useValue: this.createControlId(id, question.id, formGroup, indexDirective)
        }, {
          provide: ActionService,
          useValue: actionService
        }],
        parent: injector ? injector : this.injector
      })
    });
    if (this.shouldInitialize(controlComponentRef.instance)) {
      this.initializeComponent(formGroup, question, formDefinition.component.name, controlComponentRef.instance);
    }
    return controlComponentRef as any;
  }

  private createControlId(id: ControlIdImpl, questionId: string, control: FormGroup | FormArray | FormControl, indexDirective?: ArrayIndexDirective): ControlIdImpl {
    if (indexDirective && (control instanceof FastFormGroup || control instanceof FastFormControl)) {
      return id.addIndex(control);
    } else if (control.get(questionId) instanceof FormArray) {
      return id.addPart(questionId);
    } else {
      return id.addPart(questionId);
    }
  }

  private _findControl(controlId: string, type?: InternalControlType): InternalControlDefinition | null {
    if (this.controlRegistry.hasItem(controlId)) {
      const definition = this.controlRegistry.getDefinition(controlId);
      if (type) {
        return type === definition.internalType ? definition : null;
      } else {
        return definition;
      }
    }
    return null;
  }

  private findLegacyFormControl(controlId: string): DynamicFormDefinition | null {
    return this.uiComponents[controlId] ?? null;
  }

  private shouldInitialize(component: unknown): boolean {
    return component instanceof BaseFormArrayComponent ||
        component instanceof BaseFormInlineComponent ||
        component instanceof BaseFormControlComponent ||
        component instanceof BaseFormGroupComponent;
  }

  // TODO better type check
  private initializeComponent(control: FormGroup | FormArray | FormControl,
                              question: Question,
                              componentName: string,
                              component: BaseFormArrayComponent | BaseFormInlineComponent | BaseFormControlComponent) {
    if (component instanceof BaseFormArrayComponent && control instanceof FormGroup) {
      this.initializeFormArrayComponent(control, question, component);
    } else if (component instanceof BaseFormInlineComponent && control instanceof FormGroup) {
      this.initializeFormInlineComponent(control, question, component);
    } else if (component instanceof BaseFormControlComponent && (control instanceof FormGroup || control instanceof FormControl)) {
      this.initializeFormControlComponent(control, question, component);
    } else if (component instanceof BaseFormGroupComponent && control instanceof FormGroup) {
      this.initializeFormGroupComponent(control, question, component);
    } else {
      throw new Error(`Cannot create component [${componentName}] for question with id [${question.id}]`);
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

  private initializeFormInlineComponent(formGroup: FormGroup, question: Question, component: BaseFormInlineComponent) {
    component.formGroup = formGroup;
    component.questions = question.children ?? [];
  }

  private initializeFormGroupComponent(formGroup: FormGroup, question: Question, component: BaseFormGroupComponent) {
    component.formGroup = formGroup.controls[question.id] as FormGroup;
    component.questions = question.children ?? [];
    component.properties = question?.properties ?? {};
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
