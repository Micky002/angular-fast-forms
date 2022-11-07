import { ComponentRef, Inject, Injectable, Injector, Optional, Provider, StaticProvider, ViewContainerRef } from '@angular/core';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, Question } from '../model';
import { BaseFormInlineComponent } from '../components/base/base-inline.component';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseFormArrayComponent } from '../components/base/base-array.component';
import { FastFormArray } from '../control/fast-form-array';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { BaseFormGroupComponent } from '../components/base/base-group.component';
import { ControlRegistry } from './control/control-registry.service';
import { CONTROL_ID, CONTROL_PROPERTIES, FORM_CONTROL } from '../components/util/inject-token';
import { ActionService } from '../actions/action.service';
import { InternalControlDefinition, InternalControlType } from './models';
import { ControlIdImpl } from './control/control-id-impl';
import { ArrayIndexDirective } from '../actions/array-index.directive';
import { FastFormControl } from '../control/fast-form-control';
import { FastFormGroup } from '../control/fast-form-group';
import { QuestionDefinition } from '../components/question-definition';

@Injectable({
  providedIn: 'any',
})
export class FormRenderService {
  private uiComponents: { [key: string]: DynamicFormDefinition } = {};

  constructor(
    private controlRegistry: ControlRegistry,
    private injector: Injector,
    @Optional() @Inject(DYNAMIC_FORM_CONTROL) private controlDefinitions?: Array<DynamicFormDefinition>
  ) {
    if (controlDefinitions) {
      controlDefinitions.forEach((cd) => {
        if (this.uiComponents[cd.type]) {
          throw new Error(`Ui component with type [${cd.type}] already registered.`);
        }
        this.uiComponents[cd.type] = cd;
      });
    }
  }

  /**
   * @deprecated Will be removed in 2.0.0
   */
  isControl(questionType: string): boolean {
    return !!this.findControl(questionType);
  }

  /**
   * @deprecated Will be removed in 2.0.0
   */
  isArray(questionType: string): boolean {
    return !!this._findControl(questionType, 'array');
  }

  /**
   * @deprecated Will be removed in 2.0.0
   */
  isAction(questionType: string): boolean {
    return !!this._findControl(questionType, 'action');
  }

  /**
   * @deprecated Will be removed in 2.0.0, use {@link ControlRegistry} instead
   */
  findControl(questionType: string): DynamicFormDefinition | null {
    return this.find(questionType, 'control') ?? null;
  }

  /**
   * @deprecated Will be removed in 2.0.0, use {@link ControlRegistry} instead
   */
  find(questionType: string, controlType?: InternalControlType): DynamicFormDefinition | null {
    if (controlType === undefined) {
      return this.findLegacyFormControl(questionType) ?? this._findControl(questionType);
    } else if (controlType === 'control') {
      return this.findLegacyFormControl(questionType) ?? this._findControl(questionType, 'control');
    } else {
      return this._findControl(questionType, controlType);
    }
  }

  render<T>(
    viewContainerRef: ViewContainerRef,
    parent: AbstractControl,
    question: Question,
    formDefinition: DynamicFormDefinition,
    injector: Injector,
    actionService?: ActionService,
    indexDirective?: ArrayIndexDirective
  ): ComponentRef<T> {
    const controlComponentRef = viewContainerRef.createComponent(formDefinition.component, {
      injector: Injector.create({
        providers: this.createProviders(question, parent, injector, actionService, indexDirective),
        parent: injector ? injector : this.injector,
      }),
    });
    if (this.shouldInitialize(controlComponentRef.instance)) {
      this.initializeComponent(parent, question, formDefinition.component.name, controlComponentRef.instance);
    }
    return controlComponentRef as any;
  }

  private createProviders(
    question: Question, 
    parent: AbstractControl,
    injector: Injector,
    actionService?: ActionService,
    indexDirective?: ArrayIndexDirective
  ): StaticProvider[] {
    const id = injector.get<ControlIdImpl>(CONTROL_ID, new ControlIdImpl());
    console.log(question.id, question.type);
    
    // console.log(id);
    
    let control: AbstractControl | null = null;
    if (this.controlRegistry.hasItem(question.type)) {
      const def = this.controlRegistry.getDefinition(question.type);
      if (def.internalType === 'control' && parent instanceof FormControl) {
        control = parent;
      } else {
        control = parent.get(question.id);
      }  
    }
    return [
      { provide: QuestionDefinition, useValue: new QuestionDefinition(question) },
      { provide: CONTROL_PROPERTIES, useValue: question.properties ?? {} },
      { provide: CONTROL_ID, useValue: this.createControlId(id, question.id, parent, indexDirective) },
      { provide: FORM_CONTROL, useValue: control },
      { provide: ActionService, useValue: actionService },
    ];
  }

  private createControlId(
    id: ControlIdImpl,
    questionId: string,
    control: AbstractControl,
    indexDirective?: ArrayIndexDirective
  ): ControlIdImpl {
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
    return (
      component instanceof BaseFormArrayComponent ||
      component instanceof BaseFormInlineComponent ||
      component instanceof BaseFormControlComponent ||
      component instanceof BaseFormGroupComponent
    );
  }

  // TODO better type check
  private initializeComponent(
    control: AbstractControl,
    question: Question,
    componentName: string,
    component: BaseFormArrayComponent | BaseFormInlineComponent | BaseFormControlComponent
  ) {
    if (component instanceof BaseFormArrayComponent && control instanceof FormGroup) {
      this.initializeFormArrayComponent(control, question, component);
    } else if (component instanceof BaseFormInlineComponent && control instanceof FormGroup) {
      this.initializeFormInlineComponent(control, question, component);
    } else if (
      component instanceof BaseFormControlComponent &&
      (control instanceof FormGroup || control instanceof FormControl)
    ) {
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

  private initializeFormControlComponent(
    control: FormGroup | FormControl,
    question: Question,
    component: BaseFormControlComponent
  ) {
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
