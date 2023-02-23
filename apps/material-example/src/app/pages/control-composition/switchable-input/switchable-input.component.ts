import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Control,
  ControlDefinition,
  ControlFactory,
  FastFormsModule,
  FORM_CONTROL,
  staticControl
} from '@ngx-fast-forms/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';

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
  static createControl(question: ControlDefinition) {
    return new FormGroup({
      value: staticControl(question.defaultValue as string, {
        type: 'mat-input',
        label: question.label
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
