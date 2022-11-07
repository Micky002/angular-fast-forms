import { Inject, Injectable, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, Question } from '../model';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { FormRenderService } from '../internal/form-render.service';
import { FastFormArray } from '../control/fast-form-array';
import { FastFormControl } from '../control/fast-form-control';
import { FastFormGroup } from '../control/fast-form-group';
import { ControlRegistry } from '../internal/control/control-registry.service';
import { FromActionControlInternal } from '../internal/action/action-control-internal';
import { ControlWrapper } from '../internal/control-wrapper';
import { flattenArray } from '../util/list.util';

@Injectable({
  providedIn: 'any'
})
export class ControlFactoryService {

  constructor(private validatorFactory: ValidatorFactoryService,
              private renderService: FormRenderService,
              private controlRegistry: ControlRegistry,
              @Optional() @Inject(DYNAMIC_FORM_CONTROL) public componentRegistry?: Array<DynamicFormDefinition>) {
  }

  public createFromQuestions(parent: FormGroup, questions: Array<Question>) {
    for (const question of questions || []) {
      this.createFromQuestion(parent, question);
    }
  }

  public createFromQuestion(parent: FormGroup | FormArray, question: Question, index?: number) {
    const def = this.renderService.findControl(question.type);
    let createdControls: ControlWrapper[];
    if (def && def.inline) {
      createdControls = flattenArray(
        (question.children ?? []).map((childQuestion) => {
          return this.createControl(childQuestion);
        })
      );
    } else {
      createdControls = this.createControl(question);
    }
    createdControls.map((control) => control.addToParent(parent, index));
  }

  public createFormControl(question: Question): AbstractControl {
    return this.createControlFromDecoratedComponents(question) ??
        this.createControlFromControlFactoryMethod(question) ??
        this.createControlDefault(question);
  }

  private createControl(question: Question): ControlWrapper[] {
    const wrappers: ControlWrapper[] = [];
    if (this.renderService.findControl(question.type)) {
      wrappers.push(ControlWrapper.forFormControl(question.id, this.createAndInitFormControl(question)));
    } else if (this.controlRegistry.hasItem(question.type)) {
      const definition = this.controlRegistry.getDefinition(question.type);
      if (definition.internalType === 'control') {
        wrappers.push(ControlWrapper.forFormControl(question.id, this.createAndInitFormControl(question)));
      } else if (definition.internalType === 'action') {
        wrappers.push(ControlWrapper.forAction(question.id, this.createAndInitFormAction(question)));
      } else if (definition.internalType === 'array') {
        // TODO length check and assertions, create group automatically if more than one
        wrappers.push(ControlWrapper.forFormArray(question.id, new FastFormArray((question.children ?? [])[0], this)));
      } else if (definition.internalType === 'group') {
        const subFormGroup = new FastFormGroup(question.children ?? [], this);
        wrappers.push(ControlWrapper.forFormControl(question.id, subFormGroup));    
      }
    }
    if (wrappers.length === 0) {
      console.error(`Form control with type [${question.type}] not found.`);
    }
    return wrappers;
  }

  private createAndInitFormControl(question: Question): AbstractControl {
    const control = this.createFormControl(question);
    const validator = this.validatorFactory.createValidators(question.validation);
    const asyncValidator = this.validatorFactory.createAsyncValidators(question.validation);
    control.setValidators(validator);
    control.setAsyncValidators(asyncValidator);
    return control;
  }

  private createControlFromDecoratedComponents(question: Question): AbstractControl | undefined {
    if (this.controlRegistry.hasControlFactory(question.type)) {
      const def = this.controlRegistry.getDefinition(question.type);
      if (def.controlFactory !== undefined) {
        return def.controlFactory(question);
      }
    }
    return undefined;
  }

  private createControlFromControlFactoryMethod(question: Question): AbstractControl | undefined {
    if (this.componentRegistry) {
      const formDefinition = this.componentRegistry.find(def => def.type === question.type);
      if (formDefinition && formDefinition.component && (formDefinition.component as any)['controlFactory']) {
        return (formDefinition.component as any)['controlFactory'](question);
      } else if (formDefinition && formDefinition.controlFactory) {
        return formDefinition.controlFactory(question);
      }
    }
    return undefined;
  }

  private createControlDefault(question: Question): AbstractControl {
    if (this.componentRegistry) {
      if (question.type === 'group') {
        return new FastFormGroup(question.children ?? [], this);
      }
    }
    return new FastFormControl(question, question.defaultValue);
  }

  private createAndInitFormAction(question: Question): AbstractControl {
    const definition = this.controlRegistry.getDefinition(question.type);
    if (definition) {
      if (definition.controlFactory) {
        return definition.controlFactory(question);
      }
    }
    return new FromActionControlInternal();
  }
}
