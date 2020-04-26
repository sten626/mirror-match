import { Injectable } from '@angular/core';
import { Pod } from '@app/core/services/draft-pod.service';
import { StorageService } from '@app/core/services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentStorageService extends StorageService {
  private readonly bestOfKey = 'mm-best-of';
  private readonly draftPodsKey = 'mm-draft-pods';
  private readonly isDraftKey = 'mm-is-draft';
  private readonly totalRoundsKey = 'mm-total-rounds';

  setBestOf(bestOf: number): Observable<number> {
    return this.setNumber(this.bestOfKey, bestOf);
  }

  setDraftPods(draftPods: Pod[]): Observable<Pod[]> {
    return this.setArray(this.draftPodsKey, draftPods);
  }

  setIsDraft(isDraft: boolean): Observable<boolean> {
    return this.setBoolean(this.isDraftKey, isDraft);
  }

  setTotalRounds(totalRounds: number): Observable<number> {
    return this.setNumber(this.totalRoundsKey, totalRounds);
  }
}
