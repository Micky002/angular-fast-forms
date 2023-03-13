import { InjectionToken } from '@angular/core';
import { QuestionProperties } from '../../model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormActionGroup } from '../../actions/fast-form-action-group';
import { FormActionControl } from '../../actions/fast-form-action';
import { ControlId } from '../../control/models';

export const CONTROL_PROPERTIES = new InjectionToken<QuestionProperties>('AFF_CONTROL_PROPERTIES');
export const FORM_CONTROL = new InjectionToken<FormControl | FormGroup | FormArray | FormActionGroup | FormActionControl>('AFF_FORM_CONTROL');
export const CONTROL_ID = new InjectionToken<ControlId>('AFF_CONTROL_ID');
