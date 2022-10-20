import { Directive, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { FastFormGroup } from '../../control/fast-form-group';

@Directive({
  selector: '[affArrayIndex]'
})
export class ArrayIndexDirective implements OnChanges {

  public index!: number;

  constructor(@Optional() private group: FormGroupDirective) {
  }

  @Input() set affArrayIndex(index: number) {
    this.index = index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['affArrayIndex'] && this.group && this.group.form instanceof FastFormGroup) {
      this.group.form.index = this.index;
    }
  }
}
