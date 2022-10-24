import { Directive, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { FormControlDirective, FormGroupDirective } from '@angular/forms';
import { FastFormGroup } from '../control/fast-form-group';
import { FastFormControl } from '../control/fast-form-control';

@Directive({
  selector: '[affArrayIndex]'
})
export class ArrayIndexDirective implements OnChanges {

  public index!: number;

  constructor(@Optional() private group?: FormGroupDirective,
              @Optional() private control?: FormControlDirective) {
  }

  @Input() set affArrayIndex(index: number) {
    this.index = index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['affArrayIndex'] && this.group && this.group.form instanceof FastFormGroup) {
      this.group.form.index = this.index;
    }
    if (changes['affArrayIndex'] && this.control && this.control.form instanceof FastFormControl) {
      this.control.form.index = this.index;
    }
  }
}
