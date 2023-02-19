import { ControlComponentMetaData, ControlFactoryMethod, InternalControlComponent } from './models';
import { META_COMPONENT_OPTIONS_KEY } from '../symbols';
import { Inject, Injectable, Optional, Type } from '@angular/core';
import { BaseFormInlineComponent } from '../../components/base/base-inline.component';
import { BaseFormArrayComponent } from '../../components/base/base-array.component';
import { AbstractRegistry } from '../abstract-registry';
import { AFF_CONTROL_COMPONENTS, FormControlType } from '../../model';
import { BaseFormControlComponent } from '../../components/base/base-control.component';
import { BaseFormGroupComponent } from '../../components/base/base-group.component';
import { InternalControlDefinition, InternalControlType } from '../models';

@Injectable({
  providedIn: 'any'
})
export class ControlRegistry extends AbstractRegistry<InternalControlComponent> {

  private readonly POSSIBLE_CONTROL_TYPES: InternalControlType[] = ['control', 'group', 'array'];

  constructor(@Optional() @Inject(AFF_CONTROL_COMPONENTS) controlComponentsPerModule?: Array<Array<InternalControlComponent>>) {
    super(controlComponentsPerModule);
  }

  override ids(item: InternalControlComponent): string[] {
    return item[META_COMPONENT_OPTIONS_KEY].type.split(',');
  }

  override validate(control: InternalControlComponent) {
    if (!control[META_COMPONENT_OPTIONS_KEY]) {
      throw new Error(`Control component must be decorated with [@Control] decorator.`);
    }
  }

  hasControlFactory(type: string): boolean {
    if (this.hasItem(type)) {
      const metaData = this.getComponentMetaData(type);
      return metaData.controlFactory !== undefined;
    } else {
      return false;
    }
  }

  getControlFactory(type: string): ControlFactoryMethod | null {
    const def = this.getDefinition(type);
    if (def.controlFactory !== undefined) {
      return def.controlFactory;
    }
    return null;
  }

  getDefinition(type: string): InternalControlDefinition {
    const component = this.getItem(type);
    const componentMetaData = component[META_COMPONENT_OPTIONS_KEY];
    return {
      type: type,
      inline: componentMetaData.inline,
      controlFactory: componentMetaData.controlFactory,
      component: component as any as Type<BaseFormControlComponent<any, any> | BaseFormInlineComponent | BaseFormArrayComponent<any> | BaseFormGroupComponent>,
      internalType: componentMetaData.internalType
    };
  }

  public getControlType(type: string): FormControlType {
    const controlType = this.getItem(type)[META_COMPONENT_OPTIONS_KEY].internalType ?? 'control';
    if (this.POSSIBLE_CONTROL_TYPES.includes(controlType)) {
      return controlType as FormControlType;
    } else {
      throw new Error(`Control type [${controlType}] is not supported.`);
    }
  }

  private getComponentMetaData(type: string): ControlComponentMetaData {
    return this.getItem(type)[META_COMPONENT_OPTIONS_KEY];
  }
}
