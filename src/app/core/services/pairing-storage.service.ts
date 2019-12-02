import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';
import { Pairing } from '@app/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PairingStorageService extends StorageService {
  private pairingsKey = 'mm-pairings';

  addPairings(pairings: Pairing[]): Observable<Pairing[]> {
    return this.getPairings().pipe(
      map((value: Pairing[]) => value.concat(pairings)),
      tap((value: Pairing[]) => this.storage.setItem(this.pairingsKey, JSON.stringify(value))),
      map(() => pairings)
    );
  }

  clearResults(pairingIds: number[]): Observable<Pairing[]> {
    return this.getPairings().pipe(
      map(pairings => pairings.map(p => pairingIds.includes(p.id) ? {
        ...p,
        player1Wins: 0,
        player2Wins: 0,
        draws: 0,
        submitted: false
      } : p)),
      tap(pairings => this.storage.setItem(this.pairingsKey, JSON.stringify(pairings)))
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

  updatePairing(pairing: Pairing): Observable<Pairing[]> {
    return this.getPairings().pipe(
      map(pairings => pairings.map(p => p.id === pairing.id ? pairing : p)),
      tap(pairings => this.storage.setItem(this.pairingsKey, JSON.stringify(pairings)))
    );
  }
}
