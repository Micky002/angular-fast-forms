import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Question } from '../model';
import { ControlRegistry } from './control/control-registry.service';
import { ActionService } from '../actions/action.service';
import { ArrayIndexDirective } from '../actions/array-index.directive';
import { FormRenderService } from './base-form-renderer.service';
import { FastFormControl } from '../control/fast-form-control';
import { CONTROL_ID, FORM_CONTROL } from '../components/util/inject-token';
import { createDefaultProviders } from './inject.util';
import { ControlIdImpl } from './control/control-id-impl';
import { isIndexProvider } from './control/index-provider';


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
    const providers = createDefaultProviders(control);

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
      question: Question,
      opts?: {
        injector?: Injector,
        actionService?: ActionService,
        indexDirective?: ArrayIndexDirective
      }
  ): ComponentRef<unknown> {
    const id = opts?.injector?.get<ControlIdImpl>(CONTROL_ID, new ControlIdImpl()) ?? new ControlIdImpl();
    const controlDefinition = this.controlRegistry.getDefinition(question.type);

    let control: AbstractControl;
    if (controlDefinition.inline) {
      control = parent;
    } else {
      control = parent.get((question as any).id) as any;
    }

    const componentRef = viewContainer.createComponent(controlDefinition.component, {
      injector: Injector.create({
        providers: [
          ...createDefaultProviders(control, question),
          {provide: FORM_CONTROL, useValue: control},
          {provide: ActionService, useValue: opts?.actionService},
          ...controlDefinition.inline ?
              [] :
              [{
                provide: CONTROL_ID,
                useValue: this.createControlId(id, (question as any).id, parent, opts?.indexDirective)
              }]
        ],
        parent: opts?.injector ? opts?.injector : this.injector
      })
    });
    return componentRef;
  }

  private createControlId(id: ControlIdImpl,
                          questionId: string,
                          parent: AbstractControl,
                          indexDirective?: ArrayIndexDirective
  ): ControlIdImpl {
    if (indexDirective && isIndexProvider(parent)) {
      return id.addIndex(questionId, parent);
    } else {
      return id.addPart(questionId);
    }
  }
}
