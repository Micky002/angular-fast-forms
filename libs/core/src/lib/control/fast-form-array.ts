import { FormArray } from '@angular/forms';
import { EmitEventOption, IndexOption, OnlySelfOption, Question } from '../model';
import { ControlFactoryService } from '../service/control-factory.service';

export class FastFormArray extends FormArray {

  constructor(private question: Question,
              private controlFactory: ControlFactoryService) {
    super([]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override setValue(values: any, options?: EmitEventOption & OnlySelfOption) {
    if (values instanceof Array) {
      this.updateControlCount(values.length, {emitEvent: false});
    } else {
      // TODO error handling
    }
    super.setValue(values, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override patchValue(values: any, options?: EmitEventOption & OnlySelfOption) {
    if (values instanceof Array) {
      this.updateControlCount(values.length, {emitEvent: false});
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

  public copyRow(index: number, options?: EmitEventOption & OnlySelfOption & { insertAfter?: number }) {
    const listValue = this.getRawValue();
    listValue.splice(index, 0, listValue[index]);
    const newIndex = options?.insertAfter != null ? options?.insertAfter + 1 : index + 1;
    this.addControlsToArray(1, {
      index: newIndex,
      emitEvent: false
    });
    this.controls[newIndex].patchValue(listValue[index], options);
  }

  private updateControlCount(dataLength: number, options?: EmitEventOption) {
    if (dataLength > this.controls.length) {
      this.addControlsToArray(dataLength - this.controls.length, options);
    }
    if (dataLength < this.controls.length) {
      this.removeControlsFromArray(this.controls.length - dataLength, options);
    }
  }

  private addControlsToArray(amount: number, options?: EmitEventOption & IndexOption) {
    for (let i = 0; i < amount; i++) {
      this.controlFactory.createFromQuestion(this, this.question, options);
    }
  }

  private removeControlsFromArray(amount: number, options?: EmitEventOption & IndexOption) {
    const lastControlIndex = this.controls.length - 1;
    const startIndex = options?.index !== undefined ? options.index : lastControlIndex;
    for (let i = startIndex; i > startIndex - amount; i--) {
      this.removeAt(i, {emitEvent: options?.emitEvent});
    }
  }
}
