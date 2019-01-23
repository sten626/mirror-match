import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class DbService {
  constructor() {}

  insert(store: string, objects: any[]): Observable<any> {
    const open$ = this.open();

    return open$.pipe(
      mergeMap((db) => {
        // TODO: WORKING HERE
        return Observable.create();
      })
    );
  }

  private open(): Observable<IDBDatabase> {
    return Observable.create((observer: Observer<any>) => {
      const openReq = indexedDB.open('mirrorMatch', 1);

      const onSuccess = (event: any) => {
        observer.next(event.target.result);
        observer.complete();
      };

      const onError = (err: any) => {
        console.log(err);
        observer.error(err);
      };

      const onUpgradeNeeded = (event: any) => {
        // TODO: Break out a schema?
        const db = event.target.result;
        db.createObjectStore('players', {
          keyPath: 'id',
          autoIncrement: true
        });
        observer.next(db);
        observer.complete();
      };

      openReq.addEventListener('success', onSuccess);
      openReq.addEventListener('error', onError);
      openReq.addEventListener('upgradeneeded', onUpgradeNeeded);

      return () => {
        openReq.removeEventListener('success', onSuccess);
        openReq.removeEventListener('error', onError);
        openReq.removeEventListener('upgradeneeded', onUpgradeNeeded);
      };
    });
  }
}
