import { ArrayIndexDirective } from './array-index.directive';
import { FormControlDirective, FormGroupDirective } from '@angular/forms';
import { FastFormControl } from '../control/fast-form-control';

describe('ArrayIndexDirective', () => {
  it('should create an instance', () => {
    const directive = new ArrayIndexDirective(new FormGroupDirective([], []));
    expect(directive).toBeTruthy();
  });

  it('should update control index', () => {
    const controlDirective = new FormControlDirective(
        [],
        [],
        [{
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          registerOnChange(fn: unknown) {
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          writeValue(obj: unknown) {
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          setDisabledState(isDisabled: boolean) {
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          registerOnTouched(fn: unknown) {
          }
        }],
        null
    );
    const control = new FastFormControl({id: 'test', type: 'dummy'});
    controlDirective.form = control;
    const directive = new ArrayIndexDirective(undefined, controlDirective);
    expect(control.index).toBeNull();
    directive.affArrayIndex = 10;
    expect(control.index).toBeNull();
    directive.ngOnChanges({
      affArrayIndex: {
        firstChange: true,
        currentValue: 20,
        previousValue: 20,
        isFirstChange(): boolean {
          return true;
        }
      }
    });
    expect(control.index).toEqual(10);
  });
});
