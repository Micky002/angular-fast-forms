import { FormGroup } from '@angular/forms';
import { Question } from './model';
import { FormControlFactoryService } from './control/form-control-factory.service';
import { ValidatorFactoryService } from "./validation/validator-factory.service";

export class FastFormsGroup extends FormGroup {
  private readonly _questions: Array<Question>;

  constructor(questions: Array<Question>,
              private controlFactory: FormControlFactoryService,
              private validatorFactory: ValidatorFactoryService) {
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

  private toDef(form: FormGroup, control: Question) {
    if (control.type === 'group') {
      const subFormGroup = new FastFormsGroup(control.children || [], this.controlFactory, this.validatorFactory);
      form.addControl(control.id, subFormGroup);
    } else {
      const formControl = this.controlFactory.createControl(control.type);
      const validator = this.validatorFactory.createValidators(control.validation);
      const asyncValidator = this.validatorFactory.createAsyncValidators(control.validation);
      formControl.setValidators(validator);
      formControl.setAsyncValidators(asyncValidator);
      form.addControl(control.id, formControl);
    }
  }
}
