import { Injectable } from '@angular/core';
import { TranslateExtension } from "@ngx-fast-forms/core";

@Injectable()
export class TranslationService implements TranslateExtension {

  constructor() {
  }

  translate(id: string): string {
    return "";
  }
}
