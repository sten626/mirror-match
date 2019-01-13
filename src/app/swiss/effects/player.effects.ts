import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PlayersPageActions, PlayersApiActions } from '../actions';

@Injectable()
export class PlayerEffects {
  @Effect()
  addPlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.AddPlayer),
    map(action => action.payload),
    mergeMap(player =>
      this.db.insert('players', [player]).pipe(
        map(() => new PlayersApiActions.AddPlayerSuccess(player)),
        catchError(() => of(new PlayersApiActions.AddPlayerFailure(player)))
      )
    )
  );

  constructor(
    private actions$: Actions<PlayersPageActions.PlayersPageActionsUnion>,
    private db: Database
  ) {}
}
