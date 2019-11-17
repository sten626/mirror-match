import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Player, PlayerStorageService } from 'app/shared';
import { PairingsPageActions, PlayersApiActions, PlayersPageActions } from 'app/swiss/actions';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PlayerEffects implements OnInitEffects {
  addPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersPageActions.addPlayer),
    map(({playerName}) => ({
      id: this.nextId++,
      name: playerName,
      dropped: false
    }) as Player),
    mergeMap(player =>
      this.storageService.addPlayer(player).pipe(
        map(() => PlayersApiActions.addPlayerSuccess({player})),
        catchError(() => of(PlayersApiActions.addPlayerFailure({player})))
      )
    )
  ));

  deletePlayers$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersPageActions.deletePlayer),
    mergeMap(({playerId}) =>
      this.storageService.removePlayers([playerId]).pipe(
        map(() => PlayersApiActions.deletePlayerSuccess({playerId}))
      )
    )
  ));

  dropPlayers$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsPageActions.dropPlayers),
    map(({players}) => players.map(p => p.id)),
    mergeMap(playerIds =>
      this.storageService.dropPlayers(playerIds).pipe(
        map(() => playerIds.map(pid => ({
          id: pid,
          changes: {
            dropped: true
          }
        }) as Update<Player>)),
        map((players) => PlayersApiActions.dropPlayersSuccess({players}))
      )
    )
  ));

  loadPlayers$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersApiActions.loadPlayers),
    switchMap(() =>
      this.storageService.getPlayers().pipe(
        tap(players => {
          if (players.length > 0) {
            this.nextId = Math.max(...players.map(p => p.id)) + 1;
          } else {
            this.nextId = 1;
          }
        }),
        map(players => PlayersApiActions.loadPlayersSuccess({players}))
      )
    )
  ));

  togglePlayerDropped$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersPageActions.togglePlayerDropped),
    map(({player}) => ({
      ...player,
      dropped: !player.dropped
    }) as Player),
    mergeMap(player =>
      this.storageService.updatePlayer(player).pipe(
        map(() => PlayersApiActions.updatePlayer({
          player: {
            id: player.id,
            changes: {
              dropped: player.dropped
            }
          }
        }))
      )
    )
  ));

  updatePlayerName$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersPageActions.updatePlayerName),
    map(({player, name}) => ({
      ...player,
      name: name
    }) as Player),
    mergeMap(player =>
      this.storageService.updatePlayer(player).pipe(
        map(() => PlayersApiActions.updatePlayer({
          player: {
            id: player.id,
            changes: {
              name: player.name
            }
          }
        }))
      )
    )
  ));

  private nextId = 1;

  constructor(
    private actions$: Actions,
    private storageService: PlayerStorageService
  ) {}

  ngrxOnInitEffects() {
    return PlayersApiActions.loadPlayers();
  }
}
