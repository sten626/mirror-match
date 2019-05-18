import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, withLatestFrom, filter } from 'rxjs/operators';
import { DbService, Player } from '../../shared';
import { PlayersApiActions, PlayersPageActions } from '../actions';
import * as fromSwiss from '../reducers';

@Injectable()
export class PlayerEffects {
  @Effect()
  addPlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.AddPlayer),
    map(action => action.payload),
    mergeMap(player =>
      this.db.insert('players', [player]).pipe(
        map((newPlayer) => new PlayersApiActions.AddPlayerSuccess(newPlayer)),
        catchError(() => of(new PlayersApiActions.AddPlayerFailure(player)))
      )
    )
  );

  @Effect()
  deletePlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.DeletePlayer),
    map(action => action.payload),
    mergeMap(key =>
      this.db.delete('players', [key]).pipe(
        map((deletedKey) => new PlayersApiActions.DeletePlayerSuccess(deletedKey)),
        catchError((err) => of(new PlayersApiActions.DeletePlayerFailure(err)))
      )
    )
  );

  @Effect()
  loadPlayers$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.LoadPlayers),
    withLatestFrom(this.store.select(fromSwiss.arePlayersLoaded)),
    filter(([, isLoaded]) => !isLoaded),
    switchMap(() =>
      this.db.query('players').pipe(
        toArray(),
        map((players: Player[]) => new PlayersApiActions.LoadPlayersSuccess(players)),
        catchError((err) => of(new PlayersApiActions.LoadPlayersFailure(err)))
      )
    )
  );

  @Effect()
  updatePlayerName$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.UpdatePlayerName),
    map(action => action.payload),
    mergeMap(player => {
      return this.db.update('players', [player]).pipe(
        map((updatedPlayer: Player) => new PlayersApiActions.UpdatePlayerNameSuccess({
          id: updatedPlayer.id,
          changes: {
            name: updatedPlayer.name
          }
        })),
        catchError((err) => of(new PlayersApiActions.UpdatePlayerNameFailure(err)))
      );
    })
  );

  constructor(
    private actions$: Actions<PlayersPageActions.PlayersPageActionsUnion>,
    private db: DbService,
    private store: Store<fromSwiss.State>
  ) {}
}
