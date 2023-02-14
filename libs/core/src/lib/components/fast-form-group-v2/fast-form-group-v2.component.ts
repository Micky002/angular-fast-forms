import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control } from '../../control/control.decorator';
import { FORM_CONTROL } from '../util/inject-token';

@Control({
  type: 'group-v2',
  controlType: 'group'
})
@Component({
  selector: 'aff-form-group-v2',
  templateUrl: './fast-form-group-v2.component.html'
})
export class FastFormGroupV2Component implements OnInit {
  constructor(@Inject(FORM_CONTROL) public formGroup: FormGroup) {
  }

  public get controlKeys(): string[] {
    return Object.keys(this.formGroup.controls ?? {});
  }

  ngOnInit(): void {
  }
}
