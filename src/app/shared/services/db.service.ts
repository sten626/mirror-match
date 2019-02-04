import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

enum ReqEventTypes {
  Error = 'error',
  Success = 'success',
  UpgradeNeeded = 'upgradeneeded'
}

enum TxnEventTypes {
  Complete = 'complete',
  Error = 'error'
}

@Injectable()
export class DbService {
  constructor() {}

  delete(store: string, keys: string[]): Observable<any> {
    const open$ = this.open();

    return open$.pipe(
      mergeMap((db) => {
        return Observable.create((txnObserver: Observer<any>) => {
          const txn = db.transaction(store, 'readwrite');
          const objectStore = txn.objectStore(store);

          const onTxnError = (err: any) => txnObserver.error(err);
          const onTxnComplete = () => txnObserver.complete();

          txn.addEventListener(TxnEventTypes.Error, onTxnError);
          txn.addEventListener(TxnEventTypes.Complete, onTxnComplete);

          const requestSubscriber = from(keys).pipe(
            mergeMap((key: string) => {
              return Observable.create((reqObserver: Observer<any>) => {
                const req = objectStore.delete(key);

                req.addEventListener(ReqEventTypes.Error, (err: any) => reqObserver.error(err));
                req.addEventListener(ReqEventTypes.Success, () => reqObserver.next(key));
              });
            })
          ).subscribe(txnObserver);

          return () => {
            requestSubscriber.unsubscribe();
            txn.removeEventListener(TxnEventTypes.Error, onTxnError);
            txn.removeEventListener(TxnEventTypes.Complete, onTxnComplete);
          };
        });
      })
    );
  }

  insert(store: string, objects: any[]): Observable<any> {
    const open$ = this.open();

    return open$.pipe(
      mergeMap((db) => {
        return Observable.create((txnObserver: Observer<any>) => {
          const txn = db.transaction(store, 'readwrite');
          const objectStore = txn.objectStore(store);

          const onTxnError = (err: any) => txnObserver.error(err);
          const onTxnComplete = () => txnObserver.complete();

          txn.addEventListener(TxnEventTypes.Complete, onTxnComplete);
          txn.addEventListener(TxnEventTypes.Error, onTxnError);

          const requestSubscriber = from(objects).pipe(
            mergeMap((object: any) => {
              return Observable.create((reqObserver: Observer<any>) => {
                const req = objectStore.add(object);

                req.addEventListener(ReqEventTypes.Success, () => {
                  const key = req.result;
                  const newObject = Object.assign({}, object, { id: key });
                  reqObserver.next(newObject);
                });

                req.addEventListener(ReqEventTypes.Error, (err: any) => {
                  reqObserver.error(err);
                });
              });
            })
          ).subscribe(txnObserver);

          return () => {
            requestSubscriber.unsubscribe();
            txn.removeEventListener(TxnEventTypes.Complete, onTxnComplete);
            txn.removeEventListener(TxnEventTypes.Error, onTxnError);
          };
        });
      })
    );
  }

  query(storeName: string): Observable<any> {
    const open$ = this.open();

    return open$.pipe(
      mergeMap((db: IDBDatabase) => {
        return Observable.create((txnObserver: Observer<any>) => {
          const txn = db.transaction(storeName, 'readonly');
          const objectStore = txn.objectStore(storeName);
          const getRequest = objectStore.openCursor();

          const onTxnError = (err: any) => txnObserver.error(err);
          const onRecordFound = (ev: any) => {
            const cursor = ev.target.result;

            if (cursor) {
              txnObserver.next(cursor.value);
              cursor.continue();
            } else {
              txnObserver.complete();
            }
          };

          txn.addEventListener(TxnEventTypes.Error, onTxnError);
          getRequest.addEventListener(ReqEventTypes.Error, onTxnError);
          getRequest.addEventListener(ReqEventTypes.Success, onRecordFound);

          return () => {
            txn.removeEventListener(TxnEventTypes.Error, onTxnError);
            getRequest.removeEventListener(ReqEventTypes.Error, onTxnError);
            getRequest.removeEventListener(ReqEventTypes.Success, onRecordFound);
          };
        });
      })
    );
  }

  update(store: string, objects: any[]): Observable<any> {
    const open$ = this.open();

    return open$.pipe(
      mergeMap((db) => {
        return Observable.create((txnObserver: Observer<any>) => {
          const txn = db.transaction(store, 'readwrite');
          const objectStore = txn.objectStore(store);

          const onTxnError = (err: any) => txnObserver.error(err);
          const onTxnComplete = () => txnObserver.complete();

          txn.addEventListener(TxnEventTypes.Complete, onTxnComplete);
          txn.addEventListener(TxnEventTypes.Error, onTxnError);

          const requestSubscriber = from(objects).pipe(
            mergeMap((object: any) => {
              return Observable.create((reqObserver: Observer<any>) => {
                const req = objectStore.put(object);

                req.addEventListener(ReqEventTypes.Success, () => {
                  reqObserver.next(object);
                });

                req.addEventListener(ReqEventTypes.Error, (err: any) => {
                  reqObserver.error(err);
                });
              });
            })
          ).subscribe(txnObserver);

          return () => {
            requestSubscriber.unsubscribe();
            txn.removeEventListener(TxnEventTypes.Complete, onTxnComplete);
            txn.removeEventListener(TxnEventTypes.Error, onTxnError);
          };
        });
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
        console.log('open.onUpgradeNeeded');
        // TODO: Break out a schema?
        const db: IDBDatabase = event.target.result;
        const objectStore = db.createObjectStore('players', {
          keyPath: 'id',
          autoIncrement: true
        });
        objectStore.createIndex('name', 'name', { unique: true });
      };

      openReq.addEventListener(ReqEventTypes.Success, onSuccess);
      openReq.addEventListener(ReqEventTypes.Error, onError);
      openReq.addEventListener(ReqEventTypes.UpgradeNeeded, onUpgradeNeeded);

      return () => {
        openReq.removeEventListener(ReqEventTypes.Success, onSuccess);
        openReq.removeEventListener(ReqEventTypes.Error, onError);
        openReq.removeEventListener(ReqEventTypes.UpgradeNeeded, onUpgradeNeeded);
      };
    });
  }
}
