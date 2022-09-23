import { META_COMPONENT_OPTIONS_KEY } from '../internal/symbols';
import { InternalControlComponent } from '../internal/control/models';

export interface ControlOptions {
  type: string;
}

export function Control(options: ControlOptions) {

  return (target: unknown): void => {
    const controlComponent = target as InternalControlComponent;
    controlComponent[META_COMPONENT_OPTIONS_KEY] = {
      ...controlComponent[META_COMPONENT_OPTIONS_KEY],
      type: options.type
    }
  }
}
