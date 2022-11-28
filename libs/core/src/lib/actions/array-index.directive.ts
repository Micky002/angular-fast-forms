import { Directive, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { FormControlDirective, FormGroupDirective } from '@angular/forms';
import { FastFormGroup } from '../control/fast-form-group';
import { FastFormControl } from '../control/fast-form-control';

@Directive({
  selector: '[affArrayIndex]'
})
export class ArrayIndexDirective implements OnChanges {

  private index!: number;

  @Input() set affArrayIndex(index: number) {
    this.index = index;
  }

  constructor(@Optional() private group?: FormGroupDirective,
              @Optional() private control?: FormControlDirective) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['affArrayIndex']) {
      if (this.group?.form instanceof FastFormGroup) {
        this.group.form.index = this.index;
      }
      if (this.control?.form instanceof FastFormControl) {
        this.control.form.index = this.index;
      }
    }
  }
}
