import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { TournamentInfo } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class TournamentStorageService extends StorageService {
  private currentRoundKey = 'mm-current-round';
  private numberOfRoundsKey = 'mm-number-of-rounds';

  getCurrentRound(): Observable<number> {
    return this.getNumber(this.currentRoundKey);
  }

  getNumberOfRounds(): Observable<number> {
    return this.getNumber(this.numberOfRoundsKey);
  }

  getTournamentInfo(): Observable<TournamentInfo> {
    return this.supported().pipe(
      mergeMap(() => {
        const currentRound$ = this.getCurrentRound();
        const numberOfRounds$ = this.getNumberOfRounds();
        return combineLatest(currentRound$, numberOfRounds$, (currentRound, numberOfRounds) => {
          return {
            currentRound: currentRound,
            numberOfRounds: numberOfRounds
          };
        });
      })
    );
  }

  setCurrentRound(currentRound: number): Observable<boolean> {
    return this.setNumber(this.currentRoundKey, currentRound);
  }

  setNumberOfRounds(numberOfRounds: number): Observable<boolean> {
    return this.setNumber(this.numberOfRoundsKey, numberOfRounds);
  }

  setTournamentInfo(tournamentInfo: TournamentInfo): Observable<boolean> {
    return this.supported().pipe(
      tap(() => {
        this.storage.setItem(this.currentRoundKey, JSON.stringify(tournamentInfo.currentRound));
        this.storage.setItem(this.numberOfRoundsKey, JSON.stringify(tournamentInfo.numberOfRounds));
      })
    );
  }
}
