import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Player, PlayerStorageService } from 'app/shared';
import {
  PairingsPageActions,
  PlayersApiActions,
  PlayersPageActions,
} from 'app/swiss/actions';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class PlayerEffects implements OnInitEffects {
  addPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersPageActions.addPlayer),
      mergeMap(({ player }) =>
        this.storageService.addPlayer(player).pipe(
          map((value: Player) =>
            PlayersApiActions.addPlayerSuccess({ player: value })
          ),
          catchError(() => of(PlayersApiActions.addPlayerFailure({ player })))
        )
      )
    )
  );

  deletePlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersPageActions.deletePlayer),
      mergeMap(({ playerId }) =>
        this.storageService
          .removePlayers([playerId])
          .pipe(map(() => PlayersApiActions.deletePlayerSuccess({ playerId })))
      )
    )
  );

  dropPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PairingsPageActions.dropPlayers),
      map(({ players }) => players.map((p) => p.id!)),
      mergeMap((playerIds) =>
        this.storageService.dropPlayers(playerIds).pipe(
          map(() =>
            playerIds.map(
              (pid) =>
                ({
                  id: pid,
                  changes: {
                    dropped: true,
                  },
                } as Update<Player>)
            )
          ),
          map((players) => PlayersApiActions.dropPlayersSuccess({ players }))
        )
      )
    )
  );

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersApiActions.loadPlayers),
      switchMap(() =>
        this.storageService
          .getPlayers()
          .pipe(
            map((players) => PlayersApiActions.loadPlayersSuccess({ players }))
          )
      )
    )
  );

  togglePlayerDropped$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersPageActions.togglePlayerDropped),
      map(
        ({ player }) =>
          ({
            ...player,
            dropped: !player.dropped,
          } as Player)
      ),
      mergeMap((player) =>
        this.storageService.updatePlayer(player).pipe(
          map(() =>
            PlayersApiActions.updatePlayer({
              player: {
                id: player.id!,
                changes: {
                  dropped: player.dropped,
                },
              },
            })
          )
        )
      )
    )
  );

  updatePlayerName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersPageActions.updatePlayerName),
      map(
        ({ player, name }) =>
          ({
            ...player,
            name: name,
          } as Player)
      ),
      mergeMap((player) =>
        this.storageService.updatePlayer(player).pipe(
          map(() =>
            PlayersApiActions.updatePlayer({
              player: {
                id: player.id!,
                changes: {
                  name: player.name,
                },
              },
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private storageService: PlayerStorageService
  ) {}

  ngrxOnInitEffects() {
    return PlayersApiActions.loadPlayers();
  }
}
