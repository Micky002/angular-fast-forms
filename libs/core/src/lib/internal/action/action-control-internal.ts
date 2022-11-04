import { AbstractControl } from '@angular/forms';

export class FromActionControlInternal extends AbstractControl {

  private _disabled = false;

  override get disabled(): boolean {
    return this._disabled;
  }

  constructor() {
    super([], []);
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
