import { Directive, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { FormControlDirective, FormGroupDirective } from '@angular/forms';
import { isIndexProvider } from '../internal/control/index-provider';

@Directive({
  selector: '[affArrayIndex]'
})
export class ArrayIndexDirective implements OnChanges {

  private index!: number;

  private formProvider: { form: unknown }

  constructor(@Optional() group?: FormGroupDirective,
              @Optional() control?: FormControlDirective) {
    if (group) {
      this.formProvider = group;
    } else if (control) {
      this.formProvider = control
    } else {
      throw new Error('No form provider found.');
    }
  }

  @Input() set affArrayIndex(index: number) {
    this.index = index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['affArrayIndex']) {
      if (isIndexProvider(this.formProvider.form)) {
        this.formProvider.form.index = this.index;
      }
    }
  }
}
