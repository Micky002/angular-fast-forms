import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ActionService {

  private _actions$ = new Subject();

  public get actions(): Observable<any> {
    return this._actions$.asObservable();
  }

  emit(id: string) {
    this._actions$.next(id);
  }
}
