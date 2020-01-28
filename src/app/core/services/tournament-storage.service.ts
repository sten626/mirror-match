import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentStorageService extends StorageService {
  private readonly bestOfKey = 'mm-best-of';
  private readonly isDraftKey = 'mm-is-draft';
  private readonly totalRoundsKey = 'mm-total-rounds';

  setBestOf(bestOf: number): Observable<number> {
    return this.setNumber(this.bestOfKey, bestOf);
  }

  setIsDraft(isDraft: boolean): Observable<boolean> {
    return this.setBoolean(this.isDraftKey, isDraft);
  }

  setTotalRounds(totalRounds: number): Observable<number> {
    return this.setNumber(this.totalRoundsKey, totalRounds);
  }
}
