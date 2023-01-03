import { InjectionToken, Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

function storageAvailable() {
  let storage: Storage | undefined;

  try {
    storage = window['localStorage'];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage &&
      storage.length !== 0
    );
  }
}

function storageFactory(): Storage | null {
  if (storageAvailable()) {
    return localStorage;
  } else {
    return null;
  }
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'mirror-match-local-storage',
  {
    factory: storageFactory,
  }
);

@Injectable()
export class StorageService {
  constructor(@Inject(LOCAL_STORAGE_TOKEN) protected storage: Storage) {}

  protected getArray(key: string): Observable<any[]> {
    return this.supported().pipe(
      map(() => this.storage.getItem(key)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  protected getNumber(key: string, defaultValue = 0): Observable<number> {
    return this.supported().pipe(
      map(() => this.storage.getItem(key)),
      map((value: string | null) => (value ? JSON.parse(value) : defaultValue))
    );
  }

  protected setNumber(key: string, value: number): Observable<number> {
    return this.supported().pipe(
      tap(() => this.storage.setItem(key, JSON.stringify(value))),
      map(() => value)
    );
  }

  protected supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError('Local Storage not supported.');
  }
}
