import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';
import { Pod } from '@app/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodsStorageService extends StorageService {
  private podsKey = 'mm-pods';

  getPods(): Observable<Pod[]> {
    return this.getArray(this.podsKey);
  }
}
