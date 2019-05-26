import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Player } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class PlayerStorageService extends StorageService {
  private playersKey = 'mm-players';

  addPlayer(player: Player): Observable<Player> {
    return this.getPlayers().pipe(
      map((value: Player[]) => [
        ...value, {
          ...player,
          id: value.length > 0 ? value[value.length - 1].id + 1 : 1
        }
      ]),
      tap((value: Player[]) => this.storage.setItem(this.playersKey, JSON.stringify(value))),
      map((value: Player[]) => value[value.length - 1])
    );
  }

  deletePlayers(): Observable<boolean> {
    return this.supported().pipe(
      tap(() => this.storage.removeItem(this.playersKey))
    );
  }

  getPlayers(): Observable<Player[]> {
    return this.supported().pipe(
      map(_ => this.storage.getItem(this.playersKey)),
      map((value: string | null) => value ? JSON.parse(value) : [])
    );
  }

  removePlayers(ids: number[]): Observable<Player[]> {
    return this.getPlayers().pipe(
      map((value: Player[]) => value.filter(item => !ids.includes(item.id))),
      tap((value: Player[]) => this.storage.setItem(this.playersKey, JSON.stringify(value)))
    );
  }

  updatePlayer(player: Player): Observable<Player[]> {
    return this.getPlayers().pipe(
      map((value: Player[]) => value.map((item: Player) => item.id === player.id ? player : item)),
      tap((value: Player[]) => this.storage.setItem(this.playersKey, JSON.stringify(value)))
    );
  }
}
