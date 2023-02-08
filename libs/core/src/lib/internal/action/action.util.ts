import { AbstractControl } from '@angular/forms';
import { FromActionControlInternal } from './action-control-internal';
import { FormActionGroupInternal } from './action-group-internal';

export function isAction(control: AbstractControl): boolean {
  if (control instanceof FromActionControlInternal || control instanceof FormActionGroupInternal) {
    return true;
  } else {
    return false;
  }
}
