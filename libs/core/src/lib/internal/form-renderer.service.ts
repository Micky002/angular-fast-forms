import { ComponentRef, Injectable, Injector, StaticProvider, ViewContainerRef } from '@angular/core';
import { Question, SingleQuestion } from '../model';
import { AbstractControl, FormControl } from '@angular/forms';
import { ControlRegistry } from './control/control-registry.service';
import { CONTROL_ID, CONTROL_PROPERTIES, FORM_CONTROL } from '../components/util/inject-token';
import { ActionService } from '../actions/action.service';
import { ControlIdImpl } from './control/control-id-impl';
import { ArrayIndexDirective } from '../actions/array-index.directive';
import { FastFormControl } from '../control/fast-form-control';
import { FastFormGroup } from '../control/fast-form-group';
import { QuestionDefinition } from '../components/question-definition';
import { FormRenderService } from './base-form-renderer.service';


@Injectable()
export class FormRenderServiceImpl extends FormRenderService {

  constructor(
      private controlRegistry: ControlRegistry,
      private injector: Injector) {
    super();
  }

  override renderControl(
      viewContainerRef: ViewContainerRef,
      control: AbstractControl,
      opts?: {
        injector?: Injector,
        actionService?: ActionService,
        indexDirective?: ArrayIndexDirective
      }
  ): ComponentRef<unknown> {
    if (!(control instanceof FastFormControl)) {
      throw new Error(`Control is not a subtype of [${FastFormControl.name}].`);
    }
    if (!control.question) {
      throw new Error(`Control cannot be rendered because 'question' property is not set.`);
    }
    const question = control.question;
    const definition = this.controlRegistry.getDefinition(question.type);
    const providers = this.createProviders(
        question,
        null,
        opts?.injector,
        opts?.actionService,
        opts?.indexDirective
    );
    return viewContainerRef.createComponent(definition.component, {
      injector: Injector.create({
        providers: [
          ...providers,
          {provide: FORM_CONTROL, useValue: control}
        ],
        parent: opts?.injector ? opts?.injector : this.injector
      })
    });
  }

  override render(
      viewContainer: ViewContainerRef,
      parent: AbstractControl,
      question: SingleQuestion | Question,
      opts?: {
        injector?: Injector,
        actionService?: ActionService,
        indexDirective?: ArrayIndexDirective
      }
  ): ComponentRef<unknown> {
    if (parent instanceof FormControl) {
      console.log('render invalid control');
    }
    const controlDefinition = this.controlRegistry.getDefinition(question.type);
    const componentRef = viewContainer.createComponent(controlDefinition.component, {
      injector: Injector.create({
        providers: this.createProviders(question, parent, opts?.injector, opts?.actionService, opts?.indexDirective),
        parent: opts?.injector ? opts?.injector : this.injector
      })
    });
    return componentRef;
  }

  private createProviders(
      question: SingleQuestion | Question,
      parent: AbstractControl | null,
      injector?: Injector,
      actionService?: ActionService,
      indexDirective?: ArrayIndexDirective
  ): StaticProvider[] {
    const id = injector?.get<ControlIdImpl>(CONTROL_ID, new ControlIdImpl()) ?? new ControlIdImpl();
    let control: AbstractControl | null = null;

    let providers: StaticProvider[] = [
      {provide: QuestionDefinition, useValue: new QuestionDefinition(question)},
      {provide: CONTROL_PROPERTIES, useValue: question.properties ?? {}},
      {provide: ActionService, useValue: actionService}
    ];
    if (parent != null) {
      if (this.controlRegistry.hasItem(question.type)) {
        const def = this.controlRegistry.getDefinition(question.type);
        if (
            (def.internalType === 'control' && parent instanceof FormControl)
            || def.inline
        ) {
          control = parent;
        } else {
          control = parent.get((question as any).id);
        }
      }
      providers = [
        ...providers,
        {provide: CONTROL_ID, useValue: this.createControlId(id, (question as any).id, parent, indexDirective)},
        {provide: FORM_CONTROL, useValue: control}
      ];
    }
    return providers;
  }

  private createDefaultProviders(control: AbstractControl): StaticProvider[] {
    const providers: StaticProvider[] = [];
    if (control instanceof FastFormControl && control.question) {
      providers.push({provide: QuestionDefinition, useValue: new QuestionDefinition(control.question)});
    } else if (control instanceof FastFormGroup) {
      // providers.push({provide: QuestionDefinition, useValue: new QuestionDefinition(control.question)});
    }
    return providers;
  }

  private createControlProvider(control: AbstractControl): StaticProvider {
    return {
      provide: FORM_CONTROL,
      useValue: control
    };
  }

  private createControlId(id: ControlIdImpl,
                          questionId: string,
                          parent: AbstractControl,
                          indexDirective?: ArrayIndexDirective
  ): ControlIdImpl {
    if (indexDirective && (parent instanceof FastFormGroup || parent instanceof FastFormControl)) {
      return id.addIndex(questionId, parent);
    } else {
      return id.addPart(questionId);
    }
  }
}
