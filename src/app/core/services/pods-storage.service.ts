import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodsStorageService extends StorageService {
  private podsKey = 'mm-pods';

  getPods(): Observable<number[][]> {
    return this.getArray(this.podsKey);
  }
}
