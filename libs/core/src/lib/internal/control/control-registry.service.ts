import { ControlComponentMetaData, InternalControlComponent } from './models';
import { META_COMPONENT_OPTIONS_KEY } from '../symbols';
import { Inject, Injectable, Optional, Type } from '@angular/core';
import { BaseFormInlineComponent } from '../../components/base/base-inline.component';
import { BaseFormArrayComponent } from '../../components/base/base-array.component';
import { AbstractRegistry } from '../abstract-registry';
import { AFF_CONTROL_COMPONENTS, DynamicFormDefinition } from '../../model';
import { BaseFormControlComponent } from '../../components/base/base-control.component';
import { BaseFormGroupComponent } from '../../components/base/base-group.component';

@Injectable({
  providedIn: 'any'
})
export class ControlRegistry extends AbstractRegistry<InternalControlComponent> {

  constructor(@Optional() @Inject(AFF_CONTROL_COMPONENTS) controlsInModule?: Array<Array<InternalControlComponent>>) {
    super(controlsInModule);
  }

  id(item: InternalControlComponent): string {
    return item[META_COMPONENT_OPTIONS_KEY].type;
  }

  hasControlFactory(type: string): boolean {
    if (this.hasItem(type)) {
      const metaData = this.getComponentMetaData(type);
      return metaData.controlFactory !== undefined;
    } else {
      return false;
    }
  }

  override validate(control: InternalControlComponent) {
    if (!control[META_COMPONENT_OPTIONS_KEY]) {
      throw new Error(`Control component must be decorated with [@Control] decorator.`);
    }
  }

  getDefinition(type: string): DynamicFormDefinition {
    const component = this.getItem(type);
    const componentMetaData = component[META_COMPONENT_OPTIONS_KEY];
    return {
      type: type,
      inline: componentMetaData.inline,
      controlFactory: componentMetaData.controlFactory,
      component: component as any as Type<BaseFormControlComponent<any, any> | BaseFormInlineComponent | BaseFormArrayComponent<any> | BaseFormGroupComponent>
    };
  }

  private getComponentMetaData(type: string): ControlComponentMetaData {
    return this.getItem(type)[META_COMPONENT_OPTIONS_KEY];
  }
}
