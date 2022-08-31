import { FormArray } from '@angular/forms';
import { Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';

export class FastFormArray extends FormArray {

  constructor(private question: Question,
              private controlFactory: ControlFactoryService) {
    super([]);
  }

  override setValue(values: any, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    if (values instanceof Array) {
      this.updateControlCount(values.length);
    } else {
      // TODO error handling
    }
    super.setValue(values, options);
  }

  override patchValue(values: any, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    if (values instanceof Array) {
      this.updateControlCount(values.length);
    } else {
      // TODO error handling
    }
    super.patchValue(values, options);
  }

  private updateControlCount(dataLength: number) {
    if (dataLength > this.controls.length) {
      this.addControlsToArray(dataLength - this.controls.length);
    }
    if (dataLength < this.controls.length) {
      this.removeControlsFromArray(this.controls.length - dataLength);
    }
  }

  private addControlsToArray(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.controlFactory.createFromQuestion(this, this.question);
    }
  }

  private removeControlsFromArray(amount: number) {
    const lastControlIndex = this.controls.length - 1;
    for (let i = lastControlIndex; i > lastControlIndex - amount; i--) {
      this.removeAt(i);
    }
  }
}
