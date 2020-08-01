import { Injectable } from '@angular/core';
import { StorageService } from '@mm/core/services/storage.service';
import { Pod } from '@mm/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodsStorageService extends StorageService {
  private podsKey = 'mm-pods';

  getPods(): Observable<Pod[]> {
    return this.getArray(this.podsKey);
  }

  setPods(pods: Pod[]): Observable<Pod[]> {
    return this.setArray(this.podsKey, pods);
  }
}
