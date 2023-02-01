import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActionService } from '../actions/action.service';
import { ArrayIndexDirective } from '../actions/array-index.directive';
import { FastFormControl } from '../control/fast-form-control';
import { DynamicFormDefinition, Question, SingleQuestion } from '../model';

@Injectable()
export abstract class FormRenderService {

  abstract renderControl(
      viewContainerRef: ViewContainerRef,
      control: FastFormControl,
      injectOptions: {
        injector: Injector,
        actionService?: ActionService,
        indexDirective?: ArrayIndexDirective
      }
  ): ComponentRef<unknown>;

  abstract render<T>(
      viewContainerRef: ViewContainerRef,
      parent: AbstractControl,
      question: SingleQuestion | Question,
      formDefinition: DynamicFormDefinition,
      opts: {
        injector: Injector,
        actionService?: ActionService,
        indexDirective?: ArrayIndexDirective
      }
  ): ComponentRef<T>;
}
