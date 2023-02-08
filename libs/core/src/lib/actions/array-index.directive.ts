import { Directive, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { FormControlDirective, FormGroupDirective } from '@angular/forms';
import { isIndexProvider } from '../internal/control/index-provider';

@Directive({
  selector: '[affArrayIndex]'
})
export class ArrayIndexDirective implements OnChanges {

  private index!: number;

  constructor(@Optional() private group?: FormGroupDirective,
              @Optional() private control?: FormControlDirective) {
  }

  @Input() set affArrayIndex(index: number) {
    this.index = index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['affArrayIndex']) {
      if (this.group?.form && isIndexProvider(this.group.form)) {
        this.group.form.index = this.index;
      }
      if (this.control?.form && isIndexProvider(this.control.form)) {
        this.control.form.index = this.index;
      }
    }
  }
}
