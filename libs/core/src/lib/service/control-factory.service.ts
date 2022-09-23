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

  public createFromQuestion(form: FormGroup | FormArray, question: Question) {
    if (form instanceof FormGroup) {
      if (question.type === 'group') {
        const subFormGroup = new FastFormGroup(question.children ?? [], this);
        form.addControl(question.id, subFormGroup);
      } else if (question.type === 'array') {
        // TODO length check and assertions
        form.addControl(question.id, new FastFormArray((question.children ?? [])[0], this));
      } else {
        const ui = this.uiRegistry.find(question.type);
        if (ui) {
          if (ui.inline) {
            (question.children || []).forEach(cq => {
              const formControl = this.createControl(cq);
              form.addControl(cq.id, formControl);
            });
          } else {
            const formControl = this.createControl(question);
            form.addControl(question.id, formControl);
          }
        }
      }
    } else if (form instanceof FormArray) {
      form.push(this.createControl(question));
    }
  }

  public createRawControl(question: Question): AbstractControl {
    return this.createControlFromDecoratedComponents(question) ??
      this.createControlFromControlFactoryMethod(question) ??
      this.createControlDefault(question);
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
    return;
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
    return;
  }

  private createControlDefault(question: Question): AbstractControl {
    if (this.componentRegistry) {
      if (question.type === 'group') {
        return new FastFormGroup(question.children ?? [], this);
      } else {
        return new FastFormControl(question, question.defaultValue);
      }
    } else {
      return new FastFormControl(question, question.defaultValue);
    }
  }
}
