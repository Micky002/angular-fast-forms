import { InjectionToken } from '@angular/core';
import { ControlId, FormActionGroup, FormActionControl} from '../../control';
import { QuestionProperties } from '../../model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export const CONTROL_PROPERTIES = new InjectionToken<QuestionProperties>('AFF_CP');
export const FORM_CONTROL = new InjectionToken<FormControl | FormGroup | FormArray | FormActionGroup | FormActionControl>('AFF_FC');
export const CONTROL_ID = new InjectionToken<ControlId>('AFF_C_ID');
