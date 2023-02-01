import { Component, Inject } from '@angular/core';
import {
  ActionControl,
  ActionService,
  CONTROL_ID,
  CONTROL_PROPERTIES,
  ControlId,
  QuestionDefinition
} from '@ngx-fast-forms/core';
import { ButtonProperties, ButtonType } from './button.models';

@ActionControl({
  type: 'mat-button'
})
@Component({
  selector: 'aff-material-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  public type: ButtonType;

  constructor(@Inject(CONTROL_PROPERTIES) public properties: ButtonProperties,
              @Inject(CONTROL_ID) public id: ControlId,
              private actionService: ActionService,
              private definition: QuestionDefinition) {
    this.type = properties.type ?? 'text-button';
  }

  clickButton() {
    this.actionService.emitAction(this.id.getId() + '.' + this.definition.id);
  }
}
