import { FormArray } from '@angular/forms';
import { Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';

export class FastFormArray extends FormArray {

  constructor(private question: Question,
              private controlFactory: ControlFactoryService) {
    super([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override setValue(values: any, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    if (values instanceof Array) {
      this.updateControlCount(values.length);
    } else {
      // TODO error handling
    }
    super.setValue(values, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override patchValue(values: any, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    if (values instanceof Array) {
      this.updateControlCount(values.length);
    } else {
      // TODO error handling
    }
    super.patchValue(values, options);
  }

  public addRow(index?: number) {
    this.addControlsToArray(1, index);
  }

  public removeRow(index: number) {
    this.removeControlsFromArray(1, index);
  }

  public copyRow(index: number) {
    this.addControlsToArray(1, index);
    this.controls[index].patchValue(this.controls[index - 1].value);
  }

  private updateControlCount(dataLength: number) {
    if (dataLength > this.controls.length) {
      this.addControlsToArray(dataLength - this.controls.length);
    }
    if (dataLength < this.controls.length) {
      this.removeControlsFromArray(this.controls.length - dataLength);
    }
  }

  private addControlsToArray(amount: number, index?: number) {
    for (let i = 0; i < amount; i++) {
      this.controlFactory.createFromQuestion(this, this.question, index);
    }
  }

  private removeControlsFromArray(amount: number, index?: number) {
    const lastControlIndex = this.controls.length - 1;
    const startIndex = index !== undefined ? index : lastControlIndex;
    for (let i = startIndex; i > startIndex - amount; i--) {
      this.removeAt(i);
    }
  }
}
