import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActionService, Control, FastFormArray, FORM_CONTROL } from '@ngx-fast-forms/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Control({
  type: 'custom-array',
  controlType: 'array'
})
@Component({
  selector: 'frontend-time-array',
  templateUrl: './time-array.component.html',
  styleUrls: ['./time-array.component.scss']
})
export class TimeArrayComponent implements OnInit, OnDestroy {

  private _actionSub!: Subscription;

  constructor(private actionService: ActionService,
              @Inject(FORM_CONTROL) public formArray: FastFormArray) {
  }

  ngOnInit(): void {
    this._actionSub = this.actionService.actions.subscribe(event => {
      if (event.matchId.endsWith('time-add-action')) {
        const index = event.args[event.args.length - 2] as number;
        this.formArray.addRow(index + 1);
      } else if (event.matchId.endsWith('time-copy-action')) {
        const index = event.args[event.args.length - 2] as number;
        this.formArray.copyRow(index + 1);
      } else if (event.matchId.endsWith('time-delete-action')) {
        const index = event.args[event.args.length - 2] as number;
        this.formArray.removeRow(index);
      }
    });
  }

  ngOnDestroy(): void {
    this._actionSub.unsubscribe();
  }

  public isControl(data: unknown): boolean {
    return data instanceof FormControl;
  }

  public isGroup(data: unknown): boolean {
    return data instanceof FormGroup;
  }
}
