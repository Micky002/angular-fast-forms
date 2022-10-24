import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActionEvent } from './models';
import { ActionEventImpl } from '../internal/action/action-event-impl';

@Injectable()
export class ActionService {

  private _actions$ = new Subject<ActionEvent>();

  public get actions(): Observable<ActionEvent> {
    return this._actions$.asObservable();
  }

  emitAction(id: string) {
    this._actions$.next(new ActionEventImpl(id));
  }
}
