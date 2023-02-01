import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BasicQuestion,
  Control,
  ControlFactory,
  FastFormControl,
  FastFormsModule,
  FORM_CONTROL
} from '@ngx-fast-forms/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { startWith } from 'rxjs';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';

@Control({
  type: 'switch-input'
})
@Component({
  selector: 'frontend-switchable-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FastFormsModule,
    MatButtonModule,
    MatIconModule,
    MaterialFastFormsModule
  ],
  templateUrl: './switchable-control.component.html',
  styleUrls: ['./switchable-control.component.scss']
})
export class SwitchableControlComponent implements OnInit {

  constructor(@Inject(FORM_CONTROL) public formGroup: FormGroup) {
  }

  public get disabled(): boolean {
    return this.formGroup.get('disabled')?.value as boolean;
  }

  private set disabled(value: boolean) {
    this.formGroup.get('disabled')?.setValue(value);
  }

  @ControlFactory()
  static createGroup(question: BasicQuestion) {
    return new FormGroup({
      disabled: new FormControl(true),
      value: new FastFormControl(null, {
        question: {
          label: question.label,
          type: 'mat-input'
        }
      })
    });
  }

  ngOnInit(): void {
    this.formGroup.get('disabled')?.valueChanges.pipe(startWith(this.disabled)).subscribe(value => {
      if (value) {
        this.formGroup.get('value')?.disable({onlySelf: true, emitEvent: false});
      } else {
        this.formGroup.get('value')?.enable({onlySelf: true, emitEvent: false});
      }
    });
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
}
