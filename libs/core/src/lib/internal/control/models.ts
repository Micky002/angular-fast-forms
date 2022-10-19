import { META_COMPONENT_OPTIONS_KEY } from '../symbols';
import { AbstractControl } from '@angular/forms';
import { Question } from '../../model';

export interface InternalControlComponent {
  [META_COMPONENT_OPTIONS_KEY]: ControlComponentMetaData;
}

export interface ControlComponentMetaData {
  type: string;
  internalType: 'action' | 'control';
  inline?: boolean;
  controlFactory?: (question: Question) => AbstractControl;
}
