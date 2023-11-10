import { FormArray } from '@angular/forms';
import { EmitEventOption, IndexOption, Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';

export class FastFormArray extends FormArray {

  private get getValue(): any[] {
    return this.value;
  }

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

  public addRow(index?: number, options?: EmitEventOption) {
    this.addControlsToArray(1, {
      index: index,
      emitEvent: options?.emitEvent
    });
  }

  public copyRow(index: number) {
    const listValue = this.getValue;
    listValue.splice(index, 0, listValue[index]);
    this.patchValue(listValue);
  }

  private updateControlCount(dataLength: number) {
    if (dataLength > this.controls.length) {
      this.addControlsToArray(dataLength - this.controls.length);
    }
    if (dataLength < this.controls.length) {
      this.removeControlsFromArray(this.controls.length - dataLength);
    }
  }

  private addControlsToArray(amount: number, options?: EmitEventOption & IndexOption) {
    for (let i = 0; i < amount; i++) {
      this.controlFactory.createFromQuestion(this, this.question, options);
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
