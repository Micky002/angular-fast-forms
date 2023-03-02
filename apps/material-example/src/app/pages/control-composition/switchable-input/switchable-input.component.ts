import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Control,
  ControlDefinition,
  ControlFactory,
  ControlFactoryOptions,
  FastFormsModule,
  FORM_CONTROL
} from '@ngx-fast-forms/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { MatIconModule } from '@angular/material/icon';

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
  static createControl(question: ControlDefinition, {fb}: ControlFactoryOptions){
    return new FormGroup({
      value: fb.control(question.defaultValue as string, {
        type: 'mat-input',
        label: question.label,
        validation: {
          required: true
        }
      }),
      disabled: new FormControl(false, {
        nonNullable: true
      })
    });
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
}
