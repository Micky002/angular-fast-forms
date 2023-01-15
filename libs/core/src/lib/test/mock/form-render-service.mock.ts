import { FormRenderService } from '../../internal/form-render.service';
import {
  ActionService,
  ArrayIndexDirective,
  DynamicFormDefinition,
  FastFormControl,
  Question,
  SingleQuestion
} from '@ngx-fast-forms/core';
import { ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export class FormRenderServiceMock extends FormRenderService {
  render<T>(viewContainerRef: ViewContainerRef, parent: AbstractControl, question: SingleQuestion | Question, formDefinition: DynamicFormDefinition, injector: Injector, actionService?: ActionService, indexDirective?: ArrayIndexDirective): ComponentRef<T> {
    throw new Error('Not implemented in mock');
  }

  renderControl(viewContainerRef: ViewContainerRef, control: FastFormControl, injectOptions: { injector: Injector; actionService?: ActionService; indexDirective?: ArrayIndexDirective }): ComponentRef<unknown> {
    throw new Error('Not implemented in mock');
  }

}
