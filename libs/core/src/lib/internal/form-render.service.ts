import { ComponentRef, Injectable, Injector, StaticProvider, ViewContainerRef } from '@angular/core';
import { DynamicFormDefinition, Question } from '../model';
import { BaseFormInlineComponent } from '../components/base/base-inline.component';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BaseFormArrayComponent } from '../components/base/base-array.component';
import { FastFormArray } from '../control/fast-form-array';
import { BaseFormControlComponent } from '../components/base/base-control.component';
import { BaseFormGroupComponent } from '../components/base/base-group.component';
import { ControlRegistry } from './control/control-registry.service';
import { CONTROL_ID, CONTROL_PROPERTIES, FORM_CONTROL } from '../components/util/inject-token';
import { ActionService } from '../actions/action.service';
import { ControlIdImpl } from './control/control-id-impl';
import { ArrayIndexDirective } from '../actions/array-index.directive';
import { FastFormControl } from '../control/fast-form-control';
import { FastFormGroup } from '../control/fast-form-group';
import { QuestionDefinition } from '../components/question-definition';
import { ControlWrapperKey, hasControlWrapper } from '../service/fast-form-builder';
import { ControlWrapperV2 } from './control-wrapper-v2';

@Injectable({
  providedIn: 'any'
})
export class FormRenderService {

  constructor(
      private controlRegistry: ControlRegistry,
      private injector: Injector) {
  }

  renderOnly<T>(
      viewContainerRef: ViewContainerRef,
      control: AbstractControl,
      opts: {
        injector: Injector
      }
  ): ComponentRef<T> {
    if (!hasControlWrapper(control)) {
      throw new Error('Cannot render control which has no control wrapper.');
    }
    // console.log(parent);
    const question = (control[ControlWrapperKey] as ControlWrapperV2).question;
    // console.log(question);
    // console.log((parent[QuestionWrapper] as ControlWrapperV2).question);
    const def = this.controlRegistry.getDefinition(question.type as any);
    const providers: StaticProvider[] = [
      {provide: FORM_CONTROL, useValue: control},
      {
        provide: QuestionDefinition, useValue: new QuestionDefinition({
          id: '',
          ...question
        })
      }
    ];
    //TODO: Check if this injection is valid
    if (question.properties) {
      providers.push({provide: CONTROL_PROPERTIES, useValue: question.properties});
    }
    const controlComponentRef = viewContainerRef.createComponent(def.component, {
      injector: Injector.create({
        providers,
        parent: opts.injector ? opts.injector : this.injector
      })
    });

    // this.renderer.appendChild(viewContainerRef.element.nativeElement, ComponentRef);
    if (control instanceof FormGroup) {
      // Object.keys(parent.controls).forEach(key => {
      //   const controlComponentRef = viewContainerRef.createComponent(def.component, {
      //     injector: Injector.create({
      //       providers: [
      //         {provide: FORM_CONTROL, useValue: parent}
      //       ]
      //       // parent: injector ? injector : this.injector
      //     })
      //   });
      //
      // })
    }
    // if (this.shouldInitialize(controlComponentRef.instance)) {
    //   this.initializeComponent(parent, question, formDefinition.component.name, controlComponentRef.instance);
    // }
    return controlComponentRef as any;
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
        parent: injector ? injector : this.injector
      })
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
    let control: AbstractControl | null = null;
    if (this.controlRegistry.hasItem(question.type)) {
      const def = this.controlRegistry.getDefinition(question.type);
      if (
          (def.internalType === 'control' && parent instanceof FormControl)
          || def.inline
      ) {
        control = parent;
      } else {
        control = parent.get(question.id);
      }
    }
    return [
      {provide: QuestionDefinition, useValue: new QuestionDefinition(question)},
      {provide: CONTROL_PROPERTIES, useValue: question.properties ?? {}},
      {provide: CONTROL_ID, useValue: this.createControlId(id, question.id, parent, indexDirective)},
      {provide: FORM_CONTROL, useValue: control},
      {provide: ActionService, useValue: actionService}
    ];
  }

  private createControlId(id: ControlIdImpl,
                          questionId: string,
                          control: AbstractControl,
                          indexDirective?: ArrayIndexDirective
  ): ControlIdImpl {
    if (indexDirective && (control instanceof FastFormGroup || control instanceof FastFormControl)) {
      return id.addIndex(questionId, control);
    } else {
      return id.addPart(questionId);
    }
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
