import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastFormBuilder, FastFormsModule } from '@ngx-fast-forms/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwitchableInputModule } from './switchable-input/switchable-input.module';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';

@Component({
  selector: 'matex-control-composition',
  standalone: true,
  imports: [
    CommonModule,
    FastFormsModule,
    MaterialFastFormsModule,
    SwitchableInputModule
  ],
  templateUrl: './control-composition.component.html',
  styleUrls: ['./control-composition.component.scss']
})
export class ControlCompositionComponent {

  public form: FormGroup;

  constructor(private fb: FastFormBuilder,
              private afb: FormBuilder) {
    this.form = this.fb.control('asdf', {type: 'switch-input', label: 'Name'}) as FormGroup;
  }
}
