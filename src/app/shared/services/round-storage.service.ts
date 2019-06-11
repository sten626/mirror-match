import { Injectable } from '@angular/core';
import { Round } from 'app/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class RoundStorageService extends StorageService {
  private numberOfRoundsKey = 'mm-number-of-rounds';
  private roundsKey = 'mm-rounds';
  private selectedRoundKey = 'mm-selected-round';

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

  getNumberOfRounds(): Observable<number> {
    return this.getNumber(this.numberOfRoundsKey);
  }

  getRounds(): Observable<Round[]> {
    return this.getArray(this.roundsKey);
  }

  getSelectedRound(): Observable<number> {
    return this.getNumber(this.selectedRoundKey, 1);
  }

  setNumberOfRounds(numberOfRounds: number): Observable<boolean> {
    return this.setNumber(this.numberOfRoundsKey, numberOfRounds);
  }

  setSelectedRound(roundId: number): Observable<boolean> {
    return this.setNumber(this.selectedRoundKey, roundId);
  }

  // updatePairing(pairing: Pairing): Observable<Pairing> {

  // }

  updateRound(round: Round): Observable<Round> {
    return this.getRounds().pipe(
      map((rounds: Round[]) => rounds.map(r => r.id === round.id ? round : r)),
      tap((rounds: Round[]) =>
        this.storage.setItem(this.roundsKey, JSON.stringify(rounds))
      ),
      map(() => round)
    );
  }
}
