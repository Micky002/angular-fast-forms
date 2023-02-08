import { META_COMPONENT_OPTIONS_KEY } from '../symbols';
import { AbstractControl } from '@angular/forms';
import { Question } from '../../model';
import { InternalControlType } from '../models';
import { Type } from '@angular/core';

export type InternalControlComponentType = InternalControlComponent & Type<unknown>;

export interface InternalControlComponent {
  [META_COMPONENT_OPTIONS_KEY]: ControlComponentMetaData;
}

export interface ControlComponentMetaData {
  type: string;
  internalType: InternalControlType;
  inline?: boolean;
  controlFactory?: (question: Question) => AbstractControl;
}
