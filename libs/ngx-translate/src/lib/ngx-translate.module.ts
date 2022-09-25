import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AFF_TRANSLATE_SERVICE } from "@ngx-fast-forms/core";
import { TranslationService } from "./translation.service";

@NgModule({
  imports: [CommonModule],
  providers: [{
    provide: AFF_TRANSLATE_SERVICE,
    useClass: TranslationService,
    multi: true
  }]
})
export class NgxTranslateModule {
}
