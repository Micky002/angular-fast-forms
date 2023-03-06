import { META_COMPONENT_OPTIONS_KEY } from '../symbols';
import { InternalControlType } from '../models';
import { ControlFactoryMethod } from '../../question-definition';

export interface InternalControlComponent {
  [META_COMPONENT_OPTIONS_KEY]: ControlComponentMetaData;
}

export interface ControlComponentMetaData {
  type: string;
  internalType: InternalControlType;
  inline?: boolean;
  controlFactory?: ControlFactoryMethod;
}


