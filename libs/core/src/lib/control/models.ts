import { META_COMPONENT_OPTIONS_KEY } from '../internal/symbols';
import { AbstractControl } from '@angular/forms';
import { Question } from '../model';

export interface InternalComponent {
  [META_COMPONENT_OPTIONS_KEY]: ComponentMetaData;
}

export interface ComponentMetaData {
  controlFactory: (question: Question) => AbstractControl;
}
