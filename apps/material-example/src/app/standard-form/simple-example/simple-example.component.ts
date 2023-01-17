import { Component } from '@angular/core';
import { FastFormControl, FastFormGroup, FastFormsModule, FastFormsService } from '@ngx-fast-forms/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';

@Component({
  selector: 'frontend-simple-example',
  standalone: true,
  templateUrl: './simple-example.component.html',
  imports: [
    ReactiveFormsModule,
    FastFormsModule,
    MaterialFastFormsModule
  ],
  styleUrls: ['./simple-example.component.scss']
})
export class SimpleExampleComponent {

  public form: FastFormGroup;

  public nameControl: FastFormControl;

  constructor(private formService: FastFormsService) {
    this.nameControl = this.formService.createSingleControl({
      type: 'mat-input',
      label: 'Name'
    });
    this.form = this.formService.createDynamicForm([{
      id: 'test',
      type: 'mat-input',
      label: 'Standard input'
    }]);
  }
}
