import { Injectable } from '@angular/core';
import { Round } from 'app/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class RoundStorageService extends StorageService {
  private numberOfRoundsKey = 'mm-number-of-rounds';
  private roundsKey = 'mm-rounds';

  addRound(round: Round): Observable<Round> {
    return this.getRounds().pipe(
      map((rounds: Round[]) => [
        ...rounds,
        round
      ]),
      tap((rounds: Round[]) => this.storage.setItem(this.roundsKey, JSON.stringify(rounds))),
      map(() => round)
    );
  }

  getRounds(): Observable<Round[]> {
    return this.getArray(this.roundsKey);
  }

  setNumberOfRounds(numberOfRounds: number): Observable<boolean> {
    return this.setNumber(this.numberOfRoundsKey, numberOfRounds);
  }
}
