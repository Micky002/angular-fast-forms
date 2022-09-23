import { Component } from '@angular/core';
import { BaseFormControlComponent, Control } from '@ngx-fast-forms/core';
import { FormControl } from '@angular/forms';


@Control({
  type: 'lazy-input'
})
@Component({
  selector: 'frontend-lazy-input',
  templateUrl: './lazy-input.component.html',
  styleUrls: ['./lazy-input.component.scss'],
})
export class LazyInputComponent extends BaseFormControlComponent<any, FormControl> {

}
