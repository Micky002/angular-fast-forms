import { Component } from '@angular/core';
import { BaseFormControlComponent } from '@ngx-fast-forms/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'frontend-lazy-input',
  templateUrl: './lazy-input.component.html',
  styleUrls: ['./lazy-input.component.scss'],
})
export class LazyInputComponent extends BaseFormControlComponent {

  get formControl(): FormControl {
    return this.control as FormControl;
  }
}
