import { META_COMPONENT_OPTIONS_KEY } from '../internal/symbols';
import { InternalControlComponent } from '../internal/control/models';

export function ControlFactory() {

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
    const controlComponent = target as InternalControlComponent;
    controlComponent[META_COMPONENT_OPTIONS_KEY] = {
      ...controlComponent[META_COMPONENT_OPTIONS_KEY],
      controlFactory: descriptor.value
    }
  }
}
