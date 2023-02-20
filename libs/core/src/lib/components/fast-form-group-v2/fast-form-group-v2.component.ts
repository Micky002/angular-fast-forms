import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control } from '../../control/control.decorator';
import { FORM_CONTROL } from '../util/inject-token';
import { FormGroupV2Properties } from './properties';
import { QuestionDefinition } from '../question-definition';

@Control({
  type: 'group-v2',
  controlType: 'group'
})
@Component({
  selector: 'aff-form-group-v2',
  templateUrl: './fast-form-group-v2.component.html'
})
export class FastFormGroupV2Component {

  public props: InternalGroupProperties;

  constructor(@Inject(FORM_CONTROL) public formGroup: FormGroup,
              def: QuestionDefinition<FormGroupV2Properties>) {
    this.props = {
      ...def.properties,
      alignment: def.properties?.alignment ?? 'row'
    };
  }

  public get controlKeys(): string[] {
    return Object.keys(this.formGroup.controls ?? {});
  }
}

interface InternalGroupProperties {
  alignment: 'row' | 'column';
}
