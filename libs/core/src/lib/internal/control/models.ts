import { META_COMPONENT_OPTIONS_KEY } from '../symbols';
import { AbstractControl } from '@angular/forms';
import { Question } from '../../model';
import { InternalControlType } from '../models';

export interface InternalControlComponent {
  [META_COMPONENT_OPTIONS_KEY]: ControlComponentMetaData;
}

export interface ControlComponentMetaData {
  type: string;
  internalType: InternalControlType;
  inline?: boolean;
  controlFactory?: (question: Question) => AbstractControl;
}
