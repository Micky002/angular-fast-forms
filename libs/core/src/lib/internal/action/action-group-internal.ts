import { FormGroup } from '@angular/forms';
import { FormActionGroup } from '../../actions/fast-form-action-group';
import { FromActionControlInternal } from './action-control-internal';

export class FormActionGroupInternal extends FormGroup implements FormActionGroup {

  constructor(controls: { [key: string]: FromActionControlInternal | FormActionGroupInternal }) {
    super(controls, [], []);
  }

  private _disabled = false;

  override get disabled(): boolean {
    return this._disabled;
  }

  override disable() {
    this._disabled = true;
  }

  override enable() {
    this._disabled = false;
  }

  override reset(): void {
    this._disabled = false;
  }
}
