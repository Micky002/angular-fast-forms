import { META_COMPONENT_OPTIONS_KEY } from '../symbols';
import { AbstractControl } from '@angular/forms';
import { InternalControlType } from '../models';
import { AnyQuestion, InitialValue } from '../../service/fast-form-builder';
import { ControlFactoryOptions } from '../../model';

export interface InternalControlComponent {
  [META_COMPONENT_OPTIONS_KEY]: ControlComponentMetaData;
}

export interface ControlComponentMetaData {
  type: string;
  internalType: InternalControlType;
  inline?: boolean;
  controlFactory?: ControlFactoryMethod;
}
export type ControlFactoryMethod = (question: AnyQuestion & InitialValue, opts: ControlFactoryOptions) => AbstractControl;
