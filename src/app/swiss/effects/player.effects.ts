import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Player, PlayerStorageService } from 'app/shared';
import { DatabaseService } from 'app/shared/services/database.service';
import { PairingsPageActions, PlayersApiActions, PlayersPageActions } from 'app/swiss/actions';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class PlayerEffects implements OnInitEffects {
  addPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersPageActions.addPlayer),
    mergeMap(({player}) =>
      this.databaseService.add('players', player).pipe(
        map((id: number) => PlayersApiActions.addPlayerSuccess({
          player: {
            ...player,
            id: id
          }
        })),
        catchError(() => of(PlayersApiActions.addPlayerFailure({player})))
      )
    )
  ));

  deletePlayers$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersPageActions.deletePlayer),
    mergeMap(({playerId}) =>
      this.databaseService.removeOne('players', playerId).pipe(
        map(() => PlayersApiActions.deletePlayerSuccess({playerId}))
        // TODO: Handle error
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
      this.databaseService.selectAll('players').pipe(
        map((players: Player[]) => PlayersApiActions.loadPlayersSuccess({players}))
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

  constructor(
    private actions$: Actions,
    private databaseService: DatabaseService,
    private storageService: PlayerStorageService
  ) {}

  ngrxOnInitEffects() {
    return PlayersApiActions.loadPlayers();
  }
}
