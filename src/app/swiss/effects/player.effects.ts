import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { DbService, Player } from '../../shared';
import { PlayersApiActions, PlayersPageActions } from '../actions';

@Injectable()
export class PlayerEffects {
  @Effect()
  addPlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.AddPlayer),
    map(action => action.payload),
    mergeMap(player =>
      this.db.insert('players', [player]).pipe(
        map((newPlayer) => new PlayersApiActions.AddPlayerSuccess(newPlayer)),
        catchError(() => of(new PlayersApiActions.AddPlayerFailure({ player: player })))
      )
    )
  );

  @Effect()
  deletePlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.DeletePlayer),
    map(action => action.payload),
    mergeMap(key =>
      this.db.delete('players', [key]).pipe(
        map((deletedKey) => new PlayersApiActions.DeletePlayerSuccess({ key: deletedKey })),
        catchError((err) => of(new PlayersApiActions.AddPlayerFailure(err)))
      )
    )
  );

  @Effect()
  loadPlayers$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.LoadPlayers),
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
    private db: DbService
  ) {}
}
