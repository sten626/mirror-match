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
      map(() => pairings)
    );
  }

  deletePairings(pairingIds: number[]): Observable<Pairing[]> {
    return this.getPairings().pipe(
      map(pairings => pairings.filter(p => !pairingIds.includes(p.id))),
      tap(pairings => this.storage.setItem(this.pairingsKey, JSON.stringify(pairings)))
    );
  }

  getPairings(): Observable<Pairing[]> {
    return this.getArray(this.pairingsKey);
  }
}
