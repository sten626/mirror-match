import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { TournamentInfo } from '../models';
import { StorageService } from './storage.service';

@Injectable()
export class TournamentStorageService extends StorageService {
  private currentRoundKey = 'mm-current-round';
  private numberOfRoundsKey = 'mm-number-of-rounds';
  private selectedRoundKey = 'mm-selected-round';

  getCurrentRound(): Observable<number> {
    return this.getNumber(this.currentRoundKey);
  }

  getNumberOfRounds(): Observable<number> {
    return this.getNumber(this.numberOfRoundsKey);
  }

  getSelectedRound(): Observable<number> {
    return this.getNumber(this.selectedRoundKey, 1);
  }

  getTournamentInfo(): Observable<TournamentInfo> {
    return this.supported().pipe(
      mergeMap(() => {
        const currentRound$ = this.getCurrentRound();
        const numberOfRounds$ = this.getNumberOfRounds();
        const selectedRound$ = this.getSelectedRound();

        return combineLatest(currentRound$, numberOfRounds$, selectedRound$, (currentRound, numberOfRounds, selectedRound) => {
          return {
            currentRound: currentRound,
            numberOfRounds: numberOfRounds,
            selectedRound: selectedRound
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

  setSelectedRound(selectedRound: number): Observable<boolean> {
    return this.setNumber(this.selectedRoundKey, selectedRound);
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
