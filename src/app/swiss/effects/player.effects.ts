import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Player, PlayerStorageService } from 'app/shared';
import { PlayersApiActions, PlayersPageActions } from 'app/swiss/actions';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class PlayerEffects implements OnInitEffects {
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
  dropPlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.DropPlayer),
    map(action => action.payload),
    mergeMap(player =>
      this.storageService.updatePlayer(player).pipe(
        map(() => new PlayersApiActions.DropPlayerSuccess({
          id: player.id,
          changes: {
            dropped: true
          }
        })),
        catchError((err) => of(new PlayersApiActions.DropPlayerFailure(err)))
      )
    )
  );

  @Effect()
  loadPlayers$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersApiActions.PlayersApiActionTypes.LoadPlayers),
    switchMap(() =>
      this.storageService.getPlayers().pipe(
        map((players: Player[]) => new PlayersApiActions.LoadPlayersSuccess(players)),
        catchError((err) => of(new PlayersApiActions.LoadPlayersFailure(err)))
      )
    )
  );

  @Effect()
  updatePlayer$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.UpdatePlayer),
    map(action => action.payload),
    mergeMap(({player, changes}) => {
      const updatedPlayer: Player = {
        ...player,
        ...changes
      };
      return this.storageService.updatePlayer(updatedPlayer).pipe(
        map(() => new PlayersApiActions.UpdatePlayerSuccess({
          id: player.id,
          changes: changes
        })),
        catchError(() => of(new PlayersApiActions.UpdatePlayerFailure(player)))
      );
    })
  );

  constructor(
    private actions$: Actions<PlayersPageActions.PlayersPageActionsUnion>,
    private storageService: PlayerStorageService
  ) {}

  ngrxOnInitEffects() {
    return new PlayersApiActions.LoadPlayers();
  }
}
