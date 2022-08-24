import { Inject, Injectable, Optional } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition, Question } from '../model';

@Injectable()
export class FormControlFactoryService {

  constructor(@Optional() @Inject(DYNAMIC_FORM_CONTROL) public controlFactory?: Array<DynamicFormDefinition>) { }

  public createControl(type: string): AbstractControl {
    if (this.controlFactory) {
      const formDefinition = this.controlFactory.find(def => def.type === type);
      if (formDefinition && formDefinition.controlFactory) {
        return formDefinition.controlFactory();
      } else {
        return new FormControl();
      }
    } else {
      return new FormControl();
    }
  }

  public createRow(questions: Array<Question>): Array<{id: string, control: AbstractControl}> {
    return questions.map(q => {
      return {
        id: q.id,
        control: this.createControl(q.id)
      };
    });
  }
}
