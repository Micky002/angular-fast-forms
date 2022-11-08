import { InjectionToken } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormActionControl } from '../../actions/fast-form-action';
import { FormActionGroup } from '../../actions/fast-form-action-group';
import { ControlId } from '../../control';
import { InternalControlComponent } from '../../internal/control/models';
import { DynamicFormDefinition, Question } from '../../model';
import { QuestionProperties } from '../../question.properties';

/**
 * @deprecated
*/
export const DYNAMIC_FORM_CONTROL = new InjectionToken<DynamicFormDefinition>('AFF_DYNAMIC_FORM_CONTROL');

export const AFF_CONTROL_COMPONENTS = new InjectionToken<Array<Array<InternalControlComponent>>>('AFF_CONTROL_COMPONENTS'); 
export const FORM_CONTROL = new InjectionToken<FormControl | FormGroup | FormArray | FormActionGroup | FormActionControl>('AFF_FC');

export const CONTROL_PROPERTIES = new InjectionToken<QuestionProperties>('AFF_CP');
export const CONTROL_CHILDREN = new InjectionToken<Question[]>('AFF_CC');
export const CONTROL_ID = new InjectionToken<ControlId>('AFF_C_ID');
