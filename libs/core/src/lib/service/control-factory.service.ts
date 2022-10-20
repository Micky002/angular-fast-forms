import { Inject, Injectable, Optional } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, Question } from '../model';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { UiRegistryService } from './ui-registry.service';
import { FastFormArray } from '../control/fast-form-array';
import { FastFormControl } from '../control/fast-form-control';
import { FastFormGroup } from '../control/fast-form-group';
import { ControlRegistry } from '../internal/control/control-registry.service';

@Injectable({
  providedIn: 'any'
})
export class ControlFactoryService {

  constructor(private validatorFactory: ValidatorFactoryService,
              private uiRegistry: UiRegistryService,
              private controlRegistry: ControlRegistry,
              @Optional() @Inject(DYNAMIC_FORM_CONTROL) public componentRegistry?: Array<DynamicFormDefinition>) {
  }

  public createFromQuestions(form: FormGroup, questions: Array<Question>) {
    for (const question of questions || []) {
      this.createFromQuestion(form, question);
    }
  }

  public createFromQuestion(parent: FormGroup | FormArray, question: Question, index?: number) {
    if (parent instanceof FormGroup) {
      this.createFormControlForGroup(parent, question);
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

  private createFormControlForGroup(parent: FormGroup, question: Question) {
    if (question.type === 'group') {
      const subFormGroup = new FastFormGroup(question.children ?? [], this);
      parent.addControl(question.id, subFormGroup);
    } else if (question.type === 'array' || this.uiRegistry.isArray(question.type)) {
      // TODO length check and assertions
      parent.addControl(question.id, new FastFormArray((question.children ?? [])[0], this));
    } else {
      const def = this.uiRegistry.findControl(question.type);
      if (def) {
        if (def.inline) {
          (question.children || []).forEach(childQuestion => {
            if (this.uiRegistry.isControl(childQuestion.type)) {
              const formControl = this.createControl(childQuestion);
              parent.addControl(childQuestion.id, formControl);
            }
          });
        } else {
          const formControl = this.createControl(question);
          parent.addControl(question.id, formControl);
        }
      }
    }
  }

  private createFormControlForArray(question: Question): AbstractControl[] {
    if (question.type === 'group') {
      return [new FastFormGroup(question.children ?? [], this)];
    } else if (question.type === 'array' || this.uiRegistry.isArray(question.type)) {
      return [new FastFormArray((question.children ?? [])[0], this)];
    } else {
      const def = this.uiRegistry.findControl(question.type);
      console.log(def);
      if (def) {
        if (def.inline) {
          return (question.children || [])
              .filter(childQuestion => this.uiRegistry.isControl(childQuestion.type))
              .map(childQuestion => {
                return this.createControl(childQuestion);
              });
        } else {
          return [this.createControl(question)];
        }
      }
    }
    throw new Error(`No control of type [${question.type}].`);
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
}
