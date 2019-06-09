import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pairing } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class PairingStorageService extends StorageService {
  private pairingsKey = 'mm-pairings';

  getPairings(): Observable<Pairing[]> {
    return this.getArray(this.pairingsKey);
  }
}
