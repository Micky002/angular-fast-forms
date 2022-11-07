import { Component, Inject } from '@angular/core';
import {
  ActionControl,
  ActionService,
  CONTROL_ID,
  ControlFactory,
  ControlId,
  FORM_CONTROL,
  FormActionGroup,
  ActionGroupFactory,
  ActionControlFactory
} from '@ngx-fast-forms/core';

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
              @Inject(FORM_CONTROL) public action: FormActionGroup,
              private actionService: ActionService) {
  }

  @ControlFactory()
  public static createActions() {
    return ActionGroupFactory.create({
      add: ActionControlFactory.create(),
      copy: ActionControlFactory.create(),
      delete: ActionControlFactory.create()
    });
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
