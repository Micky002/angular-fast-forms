import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Question, SingleQuestion } from '../model';
import { ValidatorFactoryService } from '../validation/validator-factory.service';
import { FastFormArray } from '../control/fast-form-array';
import { FastFormControl } from '../control/fast-form-control';
import { FastFormGroup } from '../control/fast-form-group';
import { ControlRegistry } from '../internal/control/control-registry.service';
import { FromActionControlInternal } from '../internal/action/action-control-internal';
import { ControlWrapper } from '../internal/control-wrapper';
import { flattenArray } from '../util/list.util';
import { ControlFactoryService } from './control-factory.service';

@Injectable()
export class ControlFactoryServiceImpl extends ControlFactoryService {

  constructor(private validatorFactory: ValidatorFactoryService,
              private controlRegistry: ControlRegistry) {
    super();
  }

  public override createFromQuestions(parent: FormGroup, questions: Array<Question>) {
    for (const question of questions || []) {
      this.createFromQuestion(parent, question);
    }
  }

  public override createFromQuestion(parent: FormGroup | FormArray, question: Question, index?: number) {
    let createdControls: ControlWrapper[];
    if (this.controlRegistry.hasItem(question.type)) {
      const def = this.controlRegistry.getDefinition(question.type);
      if (def.inline) {
        createdControls = flattenArray(
            (question.children ?? []).map((childQuestion) => {
              return this.createControl(childQuestion);
            })
        );
      } else {
        createdControls = this.createControl(question);
      }
    } else {
      createdControls = this.createControl(question);
    }
    createdControls.map((control) => control.addToParent(parent, index));
  }

  public override createFormControl(question: Question): AbstractControl {
    return this.createControlFromDecoratedComponents(question) ??
        this.createControlDefault(question);
  }

  control(question: SingleQuestion): AbstractControl {
    return this.createControlFromDecoratedComponents(question as any) ??
        this.createControlDefault(question as any);
    // const control = this.createControlFromDecoratedComponents(question as any);
    // if (!control) {
    //   throw new Error(`Control with type [${question.type}] not registered.`);
    // }
    // return control;
  }

  private createControl(question: Question): ControlWrapper[] {
    const wrappers: ControlWrapper[] = [];
    if (this.controlRegistry.hasItem(question.type)) {
      const definition = this.controlRegistry.getDefinition(question.type);
      // if (!question.id) {
      //   throw new Error(`Cannot add control without [id].`);
      // }
      if (definition.internalType === 'control') {
        wrappers.push(ControlWrapper.forFormControl(question.id, this.createAndInitFormControl(question)));
      } else if (definition.internalType === 'action') {
        wrappers.push(ControlWrapper.forAction(question.id, this.createAndInitFormAction(question)));
      } else if (definition.internalType === 'array') {
        // TODO length check and assertions, create group automatically if more than one
        wrappers.push(ControlWrapper.forFormArray(question.id, new FastFormArray((question.children ?? [])[0], this)));
      } else if (definition.internalType === 'group') {
        wrappers.push(ControlWrapper.forFormControl(question.id, this.createAndInitFormGroup(question)));
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
    if (question.disabled) {
      control.disable({emitEvent: false});
    }
    return control;
  }

  private createControlFromDecoratedComponents(question: Question): AbstractControl | undefined {
    if (this.controlRegistry.hasControlFactory(question.type)) {
      const def = this.controlRegistry.getDefinition(question.type);
      if (def.controlFactory !== undefined) {
        return def.controlFactory(question, this);
      }
    }
    return undefined;
  }

  private createControlDefault(question: Question): AbstractControl {
    return new FastFormControl(question.defaultValue, {question});
  }

  private createAndInitFormAction(question: Question): AbstractControl {
    const definition = this.controlRegistry.getDefinition(question.type);
    if (definition) {
      if (definition.controlFactory) {
        return definition.controlFactory(question, this);
      }
    }
    return new FromActionControlInternal();
  }

  private createAndInitFormGroup(question: Question): AbstractControl {
    const subFormGroup = new FastFormGroup(question, this);
    if (question.disabled) {
      subFormGroup.disable({emitEvent: false});
    }
    return subFormGroup;
  }
}
