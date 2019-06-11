import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pairing } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class PairingStorageService extends StorageService {
  private pairingsKey = 'mm-pairings';

  addPairings(pairings: Pairing[]): Observable<Pairing[]> {
    return this.getPairings().pipe(
      map((value: Pairing[]) => value.concat(pairings)),
      tap((value: Pairing[]) => this.storage.setItem(this.pairingsKey, JSON.stringify(value))),
    );
  }

  deletePairings(ids: number[]): Observable<number[]> {
    return this.getPairings().pipe(
      map((pairings: Pairing[]) => pairings.filter(pairing => !ids.includes(pairing.id))),
      tap((pairings: Pairing[]) => this.storage.setItem(this.pairingsKey, JSON.stringify(pairings))),
      map(() => ids)
    );
  }

  getPairings(): Observable<Pairing[]> {
    return this.getArray(this.pairingsKey);
  }
}
