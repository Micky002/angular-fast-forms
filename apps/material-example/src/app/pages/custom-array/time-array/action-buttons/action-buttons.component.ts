import { Component, Inject } from '@angular/core';
import { ActionControl, ActionService, CONTROL_ID, ControlId } from '@ngx-fast-forms/core';

@ActionControl({
  type: 'time-array-actions'
})
@Component({
  selector: 'frontend-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {

  constructor(@Inject(CONTROL_ID) public id: ControlId,
              private actionService: ActionService) {
  }

  clickAddButton() {
    this.actionService.emitAction(this.id.getId() + '.time-action-add');
  }

  clickCopyButton() {
    this.actionService.emitAction(this.id.getId() + '.time-action-copy');
  }

  clickDeleteButton() {
    this.actionService.emitAction(this.id.getId() + '.time-action-delete');
  }
}
