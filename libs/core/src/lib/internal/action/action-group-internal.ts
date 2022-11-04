import { FormGroup } from '@angular/forms';
import { FromActionControlInternal } from './action-control-internal';

export class FormActionGroupInternal extends FormGroup {

  private _disabled = false;

  override get disabled(): boolean {
    return this._disabled;
  }

  constructor(controls: { [key: string]: FromActionControlInternal | FormActionGroupInternal }) {
    super(controls, [], []);
  }

  override disable() {
    this._disabled = true;
  }

  override enable() {
    this._disabled = false;
  }
}
