import { Inject, Injectable, Optional } from '@angular/core';
import { DYNAMIC_FORM_CONTROL, DynamicFormDefinition } from '@ngx-fast-forms/core';

@Injectable({
  providedIn: 'any'
})
export class UiRegistryService {

  private uiComponents: {[key: string]: DynamicFormDefinition} = {};

  constructor(@Optional() @Inject(DYNAMIC_FORM_CONTROL) private controlDefinitions?: Array<DynamicFormDefinition>) {
    if (controlDefinitions) {
      controlDefinitions.forEach(cd => {
        if (this.uiComponents[cd.type]) {
          throw new Error(`Ui component with type [${cd.type}] already registered.`)
        }
        this.uiComponents[cd.type] = cd;
      })
    }
  }

  find(type: string): DynamicFormDefinition | undefined {
    const uiComponent = this.uiComponents[type];
    if (!uiComponent) {
      console.warn(`No ui component registered with type [${type}].`)
    }
    return uiComponent;
  }
}
