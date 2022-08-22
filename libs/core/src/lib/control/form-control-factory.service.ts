import { Inject, Injectable, Optional } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from '../model';

@Injectable()
export class FormControlFactoryService {

  constructor(@Optional() @Inject(DYNAMIC_FORM_CONTROL) public controlFactory?: Array<DynamicFormDefinition>) { }

  public createControl(type: string): AbstractControl {
    if (this.controlFactory) {
      const formDefinition = this.controlFactory.find(def => def.type === type);
      if (formDefinition && formDefinition.controlFactory) {
        return formDefinition.controlFactory();
      } else {
        return new FormControl();
      }
    } else {
      return new FormControl();
    }
  }
}
