import { InjectionToken } from "@angular/core";

export const AFF_TRANSLATE_SERVICE = new InjectionToken('AFF_TRANSLATE_SERVICE');

export interface TranslateExtension {

  translate(id: string): string;
}
