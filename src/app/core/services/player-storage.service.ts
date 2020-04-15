import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';
import { Player } from '@app/shared/models';
import { Update } from '@ngrx/entity';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export const deleteInvalidIdError = 'Tried to delete player with invalid ID.';
export const nonexistentPlayerError = 'Cannot add nonexistent player.';
export const updateInvalidIdError = 'Tried to update player with invalid ID.';

@Injectable({
  providedIn: 'root'
})
export class PlayerStorageService extends StorageService {
  private playersKey = 'mm-players';

  addPlayer(player: Player): Observable<Player> {
    if (!player) {
      return throwError(nonexistentPlayerError);
    }

    return this.getPlayers().pipe(
      map((value: Player[]) => {
        // Assumption that they're in order, which they should be.
        const lastId = value.length ? value[value.length - 1].id : 0;
        return [
          ...value, {
            ...player,
            id: lastId + 1
          }
        ];
      }),
      tap((value: Player[]) => this.storage.setItem(this.playersKey, JSON.stringify(value))),
      map((value: Player[]) => value[value.length - 1])
    );
  }

  deletePlayer(id: number): Observable<number> {
    if (!id) {
      return throwError(deleteInvalidIdError);
    }

    return this.getPlayers().pipe(
      map(players => players.filter(p => p.id !== id)),
      tap(players => this.storage.setItem(this.playersKey, JSON.stringify(players))),
      map(() => id)
    );
  }

  // deletePlayers(): Observable<boolean> {
  //   return this.supported().pipe(
  //     tap(() => this.storage.removeItem(this.playersKey))
  //   );
  // }

  // dropPlayers(playerIds: number[]): Observable<Player[]> {
  //   return this.getPlayers().pipe(
  //     map(value => value.map(p => playerIds.includes(p.id) ? {
  //       ...p,
  //       dropped: true
  //     } : p)),
  //     tap(value => this.storage.setItem(this.playersKey, JSON.stringify(value)))
  //   );
  // }

  getPlayers(): Observable<Player[]> {
    return this.getArray(this.playersKey);
  }

  updatePlayer(player: Update<Player>): Observable<Player> {
    if (!player.id) {
      return throwError(updateInvalidIdError);
    }

    return this.getPlayers().pipe(
      map((players: Player[]) => {
        const playerIndex = players.findIndex(p => p.id === player.id);

        if (playerIndex === -1) {
          throw new Error(updateInvalidIdError);
        }

        const oldPlayer = players[playerIndex];

        players[playerIndex] = {
          ...oldPlayer,
          ...player.changes
        };

        return players;
      }),
      tap((players: Player[]) => this.storage.setItem(this.playersKey, JSON.stringify(players))),
      map((players: Player[]) => players.find(p => p.id === player.id)),
      catchError((err: Error) => throwError(err.message))
    );
  }
}
