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
    if (parent instanceof FormGroup) {
      this.createFormControlForGroup(question).map(control => {
        control.addToParent(parent);
      });
    } else if (parent instanceof FormArray) {
      const controls = this.createFormControlForArray(question);
      if (index !== undefined) {
        parent.insert(index, controls[0]);
      } else {
        parent.push(controls[0]);
      }
    }
  }

  public createRawControl(question: Question): AbstractControl {
    return this.createControlFromDecoratedComponents(question) ??
        this.createControlFromControlFactoryMethod(question) ??
        this.createControlDefault(question);
  }

  private createFormControlForGroup(question: Question): ControlWrapper[] {
    if (question.type === 'group') {
      const subFormGroup = new FastFormGroup(question.children ?? [], this);
      return [ControlWrapper.forFormControl(question.id, subFormGroup)];
    } else if (question.type === 'array' || this.renderService.isArray(question.type)) {
      // TODO length check and assertions
      return [ControlWrapper.forFormArray(question.id, new FastFormArray((question.children ?? [])[0], this))];
    } else {
      const def = this.renderService.findControl(question.type);
      if (def) {
        if (def.inline) {
          return (question.children || []).map(childQuestion => {
            if (this.renderService.isControl(childQuestion.type)) {
              const formControl = this.createControl(childQuestion);
              return ControlWrapper.forFormControl(childQuestion.id, formControl);
              // parent.addControl(childQuestion.id, formControl);
            } else if (this.renderService.isAction(childQuestion.type)) {
              return ControlWrapper.forAction(childQuestion.id, this.createRawAction(childQuestion));
            } else {
              //TODO
              throw new Error('TODO');
            }
          });
        } else {
          const formControl = this.createControl(question);
          return [ControlWrapper.forFormControl(question.id, formControl)];
        }
      } else if (this.controlRegistry.hasItem(question.type)) {
        const definition = this.controlRegistry.getDefinition(question.type);
        if (definition.internalType === 'action') {
          return [ControlWrapper.forAction(question.id, this.createRawAction(question))];
        }
      }
    }
    console.error(`Form control with type [${question.type}] not found.`);
    return [];
  }

  private createFormControlForArray(question: Question): AbstractControl[] {
    if (question.type === 'group') {
      return [new FastFormGroup(question.children ?? [], this)];
    } else if (question.type === 'array' || this.renderService.isArray(question.type)) {
      return [new FastFormArray((question.children ?? [])[0], this)];
    } else {
      const def = this.renderService.findControl(question.type);
      if (def) {
        if (def.inline) {
          return (question.children || [])
              .filter(childQuestion => this.renderService.isControl(childQuestion.type))
              .map(childQuestion => {
                return this.createControl(childQuestion);
              });
        } else {
          return [this.createControl(question)];
        }
      }
    }
    console.error(`Form action with type [${question.type}] not found.`);
    return [];
    // throw new Error(`No control component registered for type [${question.type}].`);
  }

  private createControl(question: Question): AbstractControl {
    const control = this.createRawControl(question);
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

  private createRawAction(question: Question): AbstractControl {
    const definition = this.controlRegistry.getDefinition(question.type);
    if (definition) {
      if (definition.controlFactory) {
        return definition.controlFactory(question);
      }
    }
    return new FromActionControlInternal();
  }
}
