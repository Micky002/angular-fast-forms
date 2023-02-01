import { Component } from '@angular/core';
import { FastFormControl, FastFormsModule, FastFormsService } from '@ngx-fast-forms/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  public form: FormGroup;

  public nameControl: FastFormControl;

  constructor(private formService: FastFormsService) {
    this.form = new FormGroup({
      test: this.formService.control({
        type: 'mat-input',
        label: 'Standard input'
      })
    });

    this.nameControl = this.formService.control({
      type: 'mat-input',
      label: 'Name'
    });
  }
}
