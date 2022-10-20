import { META_COMPONENT_OPTIONS_KEY } from '../internal/symbols';
import { InternalControlComponent } from '../internal/control/models';

export interface ActionControlOptions {
  type: string;
}

export function ActionControl(options: ActionControlOptions) {

  return (target: unknown): void => {
    const actionClass: InternalControlComponent = target as InternalControlComponent;
    actionClass[META_COMPONENT_OPTIONS_KEY] = {
      type: options.type,
      internalType: 'action'
    };
  };
}
