import { Injectable } from '@angular/core';
import { StorageService } from '@mm/core/services/storage.service';
import { TournamentInfo } from '@mm/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentStorageService extends StorageService {
  private readonly defaultTournamentInfo: TournamentInfo = {
    bestOf: 3,
    hasDraftStarted: false,
    hasSwissStarted: false,
    isDraft: false,
    totalRounds: 3
  };
  private readonly tournamentKey = 'mm-tournament-info';

  getTournamentInfo(): Observable<TournamentInfo> {
    return this.supported().pipe(
      map(() => {
        const dataString = this.storage.getItem(this.tournamentKey);
        const data = dataString ? JSON.parse(dataString) : {};
        return { ...this.defaultTournamentInfo, ...data };
      })
    );
  }

  setTournamentInfo(newInfo: TournamentInfo): Observable<TournamentInfo> {
    return this.getTournamentInfo().pipe(
      map((tournamentInfo) => ({
        ...tournamentInfo,
        ...newInfo
      })),
      tap((tournamentInfo) =>
        this.storage.setItem(this.tournamentKey, JSON.stringify(tournamentInfo))
      )
    );
  }
}
