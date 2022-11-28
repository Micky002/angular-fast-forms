import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { ActionEvent } from './models';
import { ActionEventImpl } from '../internal/action/action-event-impl';

@Injectable()
export class ActionService {

  private _actions$ = new Subject<ActionEvent>();

  public get actions(): Observable<ActionEvent> {
    return this._actions$.asObservable();
  }

  public actionEndWith(actionMatchId: string): Observable<ActionEvent> {
    return this.actions.pipe(
        filter(event => event.matchId.endsWith(actionMatchId))
    );
  }

  emitAction(id: string, data?: unknown) {
    this._actions$.next(new ActionEventImpl(id, data));
  }
}
