import { AbstractControl } from '@angular/forms';
import { FormActionControl } from '../../actions/fast-form-action';

export class FromActionControlInternal extends AbstractControl implements FormActionControl {

  constructor() {
    super([], []);
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

  setValue(): void {
    throw new Error('Method not supported on action.');
  }

  patchValue(): void {
    throw new Error('Method not supported on action.');
  }

  reset(): void {
    this.enable();
  }
}
