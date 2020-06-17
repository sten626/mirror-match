import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';
import { TournamentInfo } from '@app/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentStorageService extends StorageService {
  // private readonly bestOfKey = 'mm-best-of';
  // private readonly draftPodsKey = 'mm-draft-pods';
  // private readonly isDraftKey = 'mm-is-draft';
  // private readonly totalRoundsKey = 'mm-total-rounds';
  private readonly defaultTournamentInfo: TournamentInfo = {
    bestOf: 3,
    isDraft: false,
    totalRounds: 3
  };
  private readonly tournamentKey = 'mm-tournament-info';

  getTournamentInfo(): Observable<TournamentInfo> {
    return this.supported().pipe(
      map(() => this.storage.getItem(this.tournamentKey)),
      map(value => value ? JSON.parse(value) : {}),
      map(value => ({...this.defaultTournamentInfo, ...value}))
    );
  }

  setTournamentInfo(newInfo: TournamentInfo): Observable<TournamentInfo> {
    return this.getTournamentInfo().pipe(
      map(tournamentInfo => ({
        ...tournamentInfo,
        ...newInfo
      })),
      tap(tournamentInfo => this.storage.setItem(this.tournamentKey, JSON.stringify(tournamentInfo)))
    );
  }

  // setBestOf(bestOf: number): Observable<number> {
  //   return this.setNumber(this.bestOfKey, bestOf);
  // }

  // setDraftPods(draftPods: Pod[]): Observable<Pod[]> {
  //   return this.setArray(this.draftPodsKey, draftPods);
  // }

  // setIsDraft(isDraft: boolean): Observable<boolean> {
  //   return this.setBoolean(this.isDraftKey, isDraft);
  // }

  // setTotalRounds(totalRounds: number): Observable<number> {
  //   return this.setNumber(this.totalRoundsKey, totalRounds);
  // }
}
