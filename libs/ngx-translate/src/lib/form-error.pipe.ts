import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { map, Observable, of } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements OnDestroy, PipeTransform {

  private _asyncPipe: AsyncPipe;

  constructor(private translate: TranslateService,
              private ref: ChangeDetectorRef) {
    this._asyncPipe = new AsyncPipe(ref);
  }

  transform(value: ValidationErrors | null, ...args: unknown[]): string {
    return this._asyncPipe.transform(this.translateFormError(value)) ?? '';
  }

  ngOnDestroy(): void {
    this._asyncPipe.ngOnDestroy();
  }

  private translateFormError(value: ValidationErrors | null): Observable<string> {
    const keys = Object.keys(value ?? {}) ?? [];
    console.log(keys);
    if (keys.length === 1) {
      return this.translate.get(keys[0]);
    } else if (keys.length > 1) {
      return this.translate.get(keys[0]).pipe(
        map(text => text + ` +${keys.length - 1}`)
      )
    }
    return of('');
  }
}
