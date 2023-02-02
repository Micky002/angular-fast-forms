/* eslint-disable */
import { ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormDefinition, Question, SingleQuestion } from '../../model';
import { ActionService } from '../../actions/action.service';
import { ArrayIndexDirective } from '../../actions/array-index.directive';
import { FastFormControl } from '../../control/fast-form-control';
import { FormRenderService } from '../../internal/base-form-renderer.service';

export class FormRenderServiceMock extends FormRenderService {
  render<T>(
      viewContainerRef: ViewContainerRef,
      parent: AbstractControl,
      question: SingleQuestion | Question,
      formDefinition: DynamicFormDefinition,
      opts?: { injector: Injector; actionService?: ActionService; indexDirective?: ArrayIndexDirective }): ComponentRef<T> {
    throw new Error('Not implemented in mock');
  }

  renderControl(
      viewContainerRef: ViewContainerRef,
      control: FastFormControl,
      opts?: {
        injector?: Injector,
        actionService?: ActionService,
        indexDirective?: ArrayIndexDirective
      }
  ): ComponentRef<unknown> {
    throw new Error('Not implemented in mock');
  }

}
