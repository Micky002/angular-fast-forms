import { Type } from '@angular/core';
import { ControlFactoryMethod, InternalControlComponent } from '../control/models';
import { META_COMPONENT_OPTIONS_KEY } from '../symbols';

export function getControlFactory(component: Type<unknown>): ControlFactoryMethod | null {
  if (META_COMPONENT_OPTIONS_KEY in component) {
    const metaData = (component as unknown as InternalControlComponent)[META_COMPONENT_OPTIONS_KEY];
    return metaData.controlFactory ?? null;
  }
  return null;
}
