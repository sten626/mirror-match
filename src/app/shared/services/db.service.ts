import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class DbService {
  constructor() {}

  insert(store: string, objects: any[]): Observable<any> {
    console.log('Inserting');
    const open$ = this.open();

    return open$.pipe(
      mergeMap((db) => {
        return Observable.create((txnObserver: Observer<any>) => {
          const txn = db.transaction(store, 'readwrite');
          const objectStore = txn.objectStore(store);

          const onTxnError = (err: any) => txnObserver.error(err);
          const onTxnComplete = () => txnObserver.complete();

          txn.addEventListener('complete', onTxnComplete);
          txn.addEventListener('error', onTxnError);

          const requestSubscription = from(objects).pipe(
            mergeMap((object: any) => {
              return Observable.create((reqObserver: Observer<any>) => {
                console.log('Adding: ', object);
                const req = objectStore.add(object);

                req.addEventListener('success', () => {
                  console.log('add success');
                  const key = req.result;
                  const newObject = Object.assign({}, object, { id: key });
                  reqObserver.next(newObject);
                });

                req.addEventListener('error', (err: any) => {
                  console.log('add error: ', err);
                  reqObserver.error(err);
                });
              });
            })
          ).subscribe(txnObserver);

          return () => {
            requestSubscription.unsubscribe();
            txn.removeEventListener('complete', onTxnComplete);
            txn.removeEventListener('error', onTxnError);
          };
        });
      })
    );
  }

  private open(): Observable<IDBDatabase> {
    return Observable.create((observer: Observer<any>) => {
      const openReq = indexedDB.open('mirrorMatch', 1);

      const onSuccess = (event: any) => {
        console.log('open.onSuccess');
        observer.next(event.target.result);
        observer.complete();
      };

      const onError = (err: any) => {
        console.log(err);
        observer.error(err);
      };

      const onUpgradeNeeded = (event: any) => {
        console.log('open.onUpgradeNeeded');
        // TODO: Break out a schema?
        const db: IDBDatabase = event.target.result;
        const objectStore = db.createObjectStore('players', {
          keyPath: 'id',
          autoIncrement: true
        });
        objectStore.createIndex('name', 'name', { unique: true });
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
