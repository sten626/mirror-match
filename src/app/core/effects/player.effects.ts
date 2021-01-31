import { Injectable } from '@angular/core';
import { PlayersApiActions } from '@mm/core/actions';
import { PlayerStorageService } from '@mm/core/services';
import { PlayersPageActions, SetupPageActions } from '@mm/setup/actions';
// import { SetupPageActions } from '@mm/tournament/actions';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class PlayerEffects implements OnInitEffects {
  // addPlayer$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SetupPageActions.addPlayer),
  //     mergeMap(({ player }) =>
  //       this.storageService.addPlayer(player).pipe(
  //         map((value: Player) =>
  //           PlayersApiActions.addPlayerSuccess({ player: value })
  //         ),
  //         catchError(() => of(PlayersApiActions.addPlayerFailure({ player })))
  //       )
  //     )
  //   )
  // );

  clearPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetupPageActions.clearPlayers),
      mergeMap(() =>
        this.storageService.clearPlayers().pipe(
          map(() => PlayersApiActions.clearPlayersSuccess()),
          catchError((err) =>
            of(PlayersApiActions.clearPlayersFailure({ err }))
          )
        )
      )
    )
  );

  deletePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersPageActions.deletePlayer),
      mergeMap(({ id }) =>
        this.storageService.deletePlayer(id).pipe(
          map(() => PlayersApiActions.deletePlayerSuccess({ id })),
          catchError((err) =>
            of(PlayersApiActions.deletePlayerFailure({ err }))
          )
        )
      )
    )
  );

  // deletePlayers$ = createEffect(() => this.actions$.pipe(
  //   ofType(PlayersPageActions.deletePlayer),
  //   mergeMap(({playerId}) =>
  //     this.storageService.removePlayers([playerId]).pipe(
  //       map(() => PlayersApiActions.deletePlayerSuccess({playerId}))
  //     )
  //   )
  // ));

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersApiActions.loadPlayers),
      switchMap(() =>
        this.storageService.getPlayers().pipe(
          map((players) => PlayersApiActions.loadPlayersSuccess({ players })),
          catchError((err) => of(PlayersApiActions.loadPlayersFailure({ err })))
        )
      )
    )
  );

  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersPageActions.updatePlayer),
      mergeMap(({ player }) =>
        this.storageService.updatePlayer(player).pipe(
          map(() => PlayersApiActions.updatePlayerSuccess({ player })),
          catchError((err) =>
            of(PlayersApiActions.updatePlayerFailure({ err }))
          )
        )
      )
    )
  );

  // updatePlayerName$ = createEffect(() => this.actions$.pipe(
  //   ofType(PlayersPageActions.updatePlayerName),
  //   map(({player, name}) => ({
  //     ...player,
  //     name: name
  //   }) as Player),
  //   mergeMap(player =>
  //     this.storageService.updatePlayer(player).pipe(
  //       map(() => PlayersApiActions.updatePlayer({
  //         player: {
  //           id: player.id,
  //           changes: {
  //             name: player.name
  //           }
  //         }
  //       }))
  //     )
  //   )
  // ));

  constructor(
    private actions$: Actions,
    private storageService: PlayerStorageService
  ) {}

  ngrxOnInitEffects() {
    return PlayersApiActions.loadPlayers();
  }
}
