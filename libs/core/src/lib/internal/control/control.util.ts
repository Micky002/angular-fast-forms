import { ControlComponentMetaData, InternalControlComponent } from "./models";
import { META_COMPONENT_OPTIONS_KEY } from "../symbols";

export function isActionControl(component: any): InternalControlComponent | null {
  if (component[META_COMPONENT_OPTIONS_KEY]) {
    const controlMeta = component[META_COMPONENT_OPTIONS_KEY] as ControlComponentMetaData;
    if (controlMeta.internalType === 'action') {
      return component;
    }
  }
  return null;
}
