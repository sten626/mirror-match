import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';
import { TournamentInfo } from '@app/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentStorageService extends StorageService {
  // private readonly draftPodsKey = 'mm-draft-pods';
  private readonly defaultTournamentInfo: TournamentInfo = {
    bestOf: 3,
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

  // setDraftPods(draftPods: Pod[]): Observable<Pod[]> {
  //   return this.setArray(this.draftPodsKey, draftPods);
  // }
}
