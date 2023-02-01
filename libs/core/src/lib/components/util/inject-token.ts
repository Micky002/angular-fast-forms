import { InjectionToken } from '@angular/core';
import { ControlId } from '../../control';
import { QuestionProperties } from '../../model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormActionGroup } from '../../actions/fast-form-action-group';
import { FormActionControl } from '../../actions/fast-form-action';

export const CONTROL_PROPERTIES = new InjectionToken<QuestionProperties>('AFF_CP');
export const FORM_CONTROL = new InjectionToken<FormControl | FormGroup | FormArray | FormActionGroup | FormActionControl>('FORM_CONTROL');
export const CONTROL_ID = new InjectionToken<ControlId>('AFF_C_ID');
