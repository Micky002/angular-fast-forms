import { ArrayIndexDirective } from './array-index.directive';
import { FormGroupDirective } from '@angular/forms';

describe('ArrayIndexDirective', () => {
  it('should create an instance', () => {
    const directive = new ArrayIndexDirective(new FormGroupDirective([], []));
    expect(directive).toBeTruthy();
  });
});
