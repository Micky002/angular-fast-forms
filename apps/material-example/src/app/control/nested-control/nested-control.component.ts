import { Component } from '@angular/core';
import { FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { SwitchableControlModule } from './switchable-control/switchable-control.module';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'frontend-nested-control',
  templateUrl: './nested-control.component.html',
  imports: [
    MaterialFastFormsModule,
    SwitchableControlModule,
    JsonPipe
  ],
  styleUrls: ['./nested-control.component.scss']
})
export class NestedControlComponent {

  public nestedForm: FastFormGroup;

  constructor(
      private fb: FastFormsService
  ) {
    this.nestedForm = this.fb.group([
      {
        id: 'test',
        type: 'switch-input',
        label: 'Name'
      }
    ]);
  }
}
