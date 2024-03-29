import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FastFormGroup } from '../control/fast-form-group';
import { EmitEventOption, IndexOption } from '../model';
import { FromActionControlInternal } from './action/action-control-internal';
import { InternalControlType } from './models';

export class ControlWrapper {

    private control: AbstractControl | null;
    private action: FromActionControlInternal | null;
  
    constructor(private id: string, control: AbstractControl, controlType: InternalControlType) {
      if (controlType === 'action') {
        this.control = null;
        this.action = control as FromActionControlInternal;
      } else if (control instanceof AbstractControl) {
        this.control = control;
        this.action = null;
      } else {
        throw new Error('Unsupported type.');
      }
    }
  
    static forFormControl<T extends AbstractControl>(id: string, formControl: T): ControlWrapper {
      return new ControlWrapper(id, formControl, 'control');
    }
  
    static forFormArray<T extends FormArray>(id: string, formArray: T): ControlWrapper {
      return new ControlWrapper(id, formArray, 'array');
    }
  
    static forAction(id: string, actionControl: AbstractControl): ControlWrapper {
      return new ControlWrapper(id, actionControl, 'action');
    }
  
    public addToParent(parent: FormGroup | FormArray, options?: IndexOption & EmitEventOption) {
      if (parent instanceof FormGroup) {
        this.addToGroup(parent, {
          emitEvent: options?.emitEvent
        });
      } else {
        this.addToArray(parent, options?.index, {
          emitEvent: options?.emitEvent
        });
      }
    }

    private addToGroup(parent: FormGroup, options?: EmitEventOption) {
      if (this.control !== null) {
        parent.addControl(this.id, this.control, options);
      } else if (this.action !== null) {
        if (parent instanceof FastFormGroup) {
            parent.addControl(this.id, this.action, options);
        } else {
            console.warn('Cannot add action to standard reactive form.');
        }
      } else {
        throw new Error(`Cannot add control or action to parent.`);
      }
    }

    private addToArray(parent: FormArray, index?: number, options?: EmitEventOption) {
      if (this.control !== null) {
        if (index !== undefined) {
          parent.insert(index, this.control, options);
        } else {
          parent.push(this.control, options);
        }
      } else if (this.action !== null) {
        console.warn('Actions are not supported in form arrays.');
      } else {
        throw new Error(`Cannot add control or action to parent.`);
      }
    }
  }
