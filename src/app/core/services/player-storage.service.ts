import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';
import { Player } from '@app/shared/models';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class PlayerStorageService extends StorageService {
  private playersKey = 'mm-players';

  addPlayer(player: Player): Observable<Player> {
    if (!player) {
      return throwError('Cannot add nonexistent player.');
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
      return throwError('Bad ID passed to deletePlayer.');
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
    return this.getPlayers().pipe(
      map((players: Player[]) => players.map((item: Player) => {
        if (item.id === player.id) {
          return {
            ...item,
            ...player.changes
          };
        } else {
          return item;
        }
      })),
      tap((players: Player[]) => this.storage.setItem(this.playersKey, JSON.stringify(players))),
      map((players: Player[]) => players.find(p => p.id === player.id))
    );
  }
}
