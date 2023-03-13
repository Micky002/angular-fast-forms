import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Control,
  ControlFactory,
  ControlFactoryOptions,
  FactoryQuestionDefinition,
  FastFormsModule,
  FORM_CONTROL
} from '@ngx-fast-forms/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { InputProperties, MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { MatIconModule } from '@angular/material/icon';
import { SwitchableInputModel } from './switchable-input.model';

@Control({
  type: 'switch-input'
})
@Component({
  selector: 'matex-switch-input',
  standalone: true,
  imports: [
    CommonModule,
    FastFormsModule,
    MaterialFastFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './switchable-input.component.html',
  styleUrls: ['./switchable-input.component.scss']
})
export class SwitchableInputComponent {

  public valueControl: FormControl;

  constructor(@Inject(FORM_CONTROL) private formGroup: FormGroup) {
    this.valueControl = this.formGroup.get('value') as FormControl;
  }

  get disabled(): boolean {
    return this.formGroup.get('disabled')?.value === true;
  }

  set disabled(value: boolean) {
    this.formGroup.get('disabled')?.patchValue(value);
    if (this.disabled) {
      this.valueControl.disable();
    } else {
      this.valueControl.enable();
    }
  }

  @ControlFactory()
  static createControl(question: FactoryQuestionDefinition<InputProperties, SwitchableInputModel>, {fb}: ControlFactoryOptions) {
    return new FormGroup({
      value: fb.control(question.defaultValue?.value ?? '', {
        type: 'mat-input',
        label: question.label,
        validation: {
          required: true
        }
      }),
      disabled: new FormControl(question.defaultValue?.disabled ?? false, {
        nonNullable: true
      })
    });
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
}
