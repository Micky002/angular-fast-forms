import { Component, Inject } from '@angular/core';
import { ActionControl, ActionService, CONTROL_ID, CONTROL_PROPERTIES } from '@ngx-fast-forms/core';
import { ButtonProperties } from './button.models';

@ActionControl({
  type: 'button'
})
@Component({
  selector: 'aff-material-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  constructor(@Inject(CONTROL_PROPERTIES) public properties: ButtonProperties,
              @Inject(CONTROL_ID) public id: string,
              private actionService: ActionService) {
  }

  clickButton() {
    this.actionService.emit(this.id);
  }
}
