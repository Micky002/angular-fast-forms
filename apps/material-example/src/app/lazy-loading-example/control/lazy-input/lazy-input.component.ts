import { Component, Inject } from '@angular/core';
import { Control, FORM_CONTROL } from '@ngx-fast-forms/core';
import { FormControl } from '@angular/forms';


@Control({
  type: 'lazy-input'
})
@Component({
  selector: 'frontend-lazy-input',
  templateUrl: './lazy-input.component.html',
  styleUrls: ['./lazy-input.component.scss'],
})
export class LazyInputComponent {

  constructor(@Inject(FORM_CONTROL) public control: FormControl) {
  }
}
