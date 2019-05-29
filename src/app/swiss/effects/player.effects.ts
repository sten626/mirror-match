import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Player, PlayerStorageService } from '../../shared';
import { PlayersApiActions, PlayersPageActions } from '../actions';

@Injectable()
export class PlayerInitEffects implements OnInitEffects {
  ngrxOnInitEffects() {
    return new PlayersPageActions.LoadPlayers();
  }
}

@Injectable()
export class PlayerEffects {
  @Effect()
  addPlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.AddPlayer),
    map(action => action.payload),
    mergeMap(player =>
      this.storageService.addPlayer(player).pipe(
        map((value: Player) => new PlayersApiActions.AddPlayerSuccess(value)),
        catchError((err) => {
          console.error(err);
          return of(new PlayersApiActions.AddPlayerFailure(player));
        })
      )
    )
  );

  @Effect()
  deletePlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.DeletePlayer),
    map(action => action.payload),
    mergeMap(player =>
      this.storageService.removePlayers([player.id]).pipe(
        map(() => new PlayersApiActions.DeletePlayerSuccess(player)),
        catchError(() => of(new PlayersApiActions.DeletePlayerFailure(player)))
      )
    )
  );

  @Effect()
  loadPlayers$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.LoadPlayers),
    switchMap(() =>
      this.storageService.getPlayers().pipe(
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
      return this.storageService.updatePlayer(player).pipe(
        map(_ => new PlayersApiActions.UpdatePlayerNameSuccess({
          id: player.id,
          changes: {
            name: player.name
          }
        })),
        catchError(() => of(new PlayersApiActions.UpdatePlayerNameFailure(player)))
      );
    })
  );

  constructor(
    private actions$: Actions<PlayersPageActions.PlayersPageActionsUnion>,
    private storageService: PlayerStorageService
  ) {}
}
