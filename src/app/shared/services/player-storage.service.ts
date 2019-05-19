import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Player } from '../models';
import { map, tap } from 'rxjs/operators';

export function storageAvailable() {
  let storage: Storage;

  try {
    storage = window['localStorage'];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    ) && (storage && storage.length !== 0);
  }
}

export function storageFactory(): Storage {
  if (storageAvailable()) {
    return localStorage;
  } else {
    return null;
  }
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'mirror-match-local-storage', {
    factory: storageFactory
  }
);

@Injectable()
export class PlayerStorageService {
  private playersKey = 'mm-players';

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}

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

  private supported(): Observable<boolean> {
    return this.storage !== null ? of(true) : throwError('Local Storage not supported.');
  }
}
