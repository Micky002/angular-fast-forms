import { META_COMPONENT_OPTIONS_KEY } from '../internal/symbols';
import { InternalControlComponent } from '../internal/control/models';
import { FormControlType } from '../model';

export interface ControlOptions {
  type: string;
  inline?: boolean;
  controlType?: FormControlType;
}

export function Control(options: ControlOptions) {

  return (target: unknown): void => {
    const controlComponent = target as InternalControlComponent;
    controlComponent[META_COMPONENT_OPTIONS_KEY] = {
      ...controlComponent[META_COMPONENT_OPTIONS_KEY],
      internalType: options.controlType === undefined ? 'control' : options.controlType,
      type: options.type,
      inline: options.inline
    };
  };
}
