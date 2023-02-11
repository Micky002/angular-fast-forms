import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlRegistry } from '../internal/control/control-registry.service';
import { QuestionProperties, ValidationOptions } from '@ngx-fast-forms/core';

@Injectable()
export class FastFormBuilder {

  constructor(private cr: ControlRegistry) {
  }

  public group(question: BasicQuestionV2, groupDef?: { [key: string]: any }): FormGroup {
    let definition = this.cr.getDefinition(question.type);

  }
}

export interface BasicQuestionV2 {
  type: string;
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
  validation?: ValidationOptions;
  properties?: QuestionProperties;
  // defaultValue?: string | number;
  // children?: Question[];
}
