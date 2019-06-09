import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pairing } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class PairingStorageService extends StorageService {
  private pairingsKey = 'mm-pairings';

  addPairings(pairings: Pairing[]) {
    return this.getPairings().pipe(
      map((value: Pairing[]) => value.concat(pairings)),
      tap((value: Pairing[]) => this.storage.setItem(this.pairingsKey, JSON.stringify(value))),
      map(() => pairings)
    );
  }

  getPairings(): Observable<Pairing[]> {
    return this.getArray(this.pairingsKey);
  }
}
