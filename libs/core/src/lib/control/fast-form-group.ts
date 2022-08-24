import { AbstractControl, FormGroup } from '@angular/forms';
import { Question } from '../model';
import { FormControlFactoryService } from '../service/form-control-factory.service';
import { ValidatorFactoryService } from "../validation/validator-factory.service";
import { UiRegistryService } from '../service/ui-registry.service';

export class FastFormGroup extends FormGroup {
  private readonly _questions: Array<Question>;

  constructor(questions: Array<Question>,
              private controlFactory: FormControlFactoryService,
              private validatorFactory: ValidatorFactoryService,
              private uiRegistry: UiRegistryService) {
    super({})
    const ids = new Set();
    questions.forEach(q => {
      if (ids.has(q.id)) {
        throw new Error(`Duplicated form control id ${q.id} found.`);
      }
      ids.add(q.id);
    });
    this._questions = questions;
    this.toDefinition();
  }

  public get questions(): Array<Question> {
    return this._questions || [];
  }

  private toDefinition() {
    for (const control of this._questions || []) {
      this.toDef(this, control);
    }
  }

  private toDef(form: FormGroup, question: Question) {
    if (question.type === 'group') {
      const subFormGroup = new FastFormGroup(question.children || [], this.controlFactory, this.validatorFactory, this.uiRegistry);
      form.addControl(question.id, subFormGroup);
    } else {
      const ui = this.uiRegistry.find(question.type);
      if (ui) {
        if (ui.inline) {
          (question.children || []).forEach(cq => {
            const formControl = this.createControl(cq);
            form.addControl(cq.id, formControl);
          })
        } else {
          const formControl = this.createControl(question);
          form.addControl(question.id, formControl);
        }
      }
    }
  }

  private createControl(question: Question): AbstractControl {
    const control = this.controlFactory.createControl(question.type);
    const validator = this.validatorFactory.createValidators(question.validation);
    const asyncValidator = this.validatorFactory.createAsyncValidators(question.validation);
    control.setValidators(validator);
    control.setAsyncValidators(asyncValidator);
    return control;
  }
}
