import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Player } from 'app/shared/models';
import { Observable, Observer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { getSchema } from './schema';

const IDB_ERROR = 'error';
const IDB_READONLY = 'readonly';
const IDB_READWRITE = 'readwrite';
const IDB_SUCCESS = 'success';
const IDB_UPGRADE_NEEDED = 'upgradeneeded';

function getIdbFactory(): IDBFactory {
  return typeof window !== 'undefined' ? window.indexedDB : self.indexedDB;
}

const DATABASE_TOKEN = new InjectionToken('mm-database', {
  factory: getIdbFactory
});
const IDB_SCHEMA = new InjectionToken('IDB_SCHEMA', {
  factory: getSchema
});

export interface DbStore {
  primaryKey?: string;
  autoIncrement?: boolean;
}

export interface DbSchema {
  version: number;
  name: string;
  stores: Map<string, DbStore>;
}

enum RequestType {
  ADD,
  REMOVE_ONE,
  SELECT_ALL,
  UPDATE_ONE
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private idb: IDBFactory;
  private schema: DbSchema;

  constructor(@Inject(DATABASE_TOKEN) idbBackend: any, @Inject(IDB_SCHEMA) schema: any) {
    this.idb = idbBackend;
    this.schema = schema;
  }

  add(storeName: string, entity: any): Observable<number | string> {
    return this.makeRequest(storeName, RequestType.ADD, IDB_READWRITE, entity);
  }

  removeOne(storeName: string, key: number | string): Observable<boolean> {
    return this.makeRequest(storeName, RequestType.REMOVE_ONE, IDB_READWRITE, key);
  }

  selectAll(storeName: string): Observable<any> {
    return this.makeRequest(storeName, RequestType.SELECT_ALL);
  }

  updateOne(storeName: string, entity: Update<any>): Observable<boolean> {
    return this.makeRequest(storeName, RequestType.UPDATE_ONE, IDB_READWRITE, entity);
  }

  private makeRequest(
    storeName: string,
    requestType: RequestType,
    mode: IDBTransactionMode = IDB_READONLY,
    value: any = null
  ): Observable<any> {
    const db$ = this.open();

    return db$.pipe(
      mergeMap(db => {
        return new Observable((observer: Observer<any>) => {
          const transaction = db.transaction(storeName, mode);
          transaction.oncomplete = () => observer.complete();
          transaction.onerror = (err: any) => observer.error(err);
          const store = transaction.objectStore(storeName);
          let request: IDBRequest;
          // let onSuccess: (event: any) => void;

          switch (requestType) {
            case RequestType.ADD: {
              request = store.add(value);
              request.onsuccess = (event: any) => observer.next(event.target.result);
              break;
            }
            case RequestType.REMOVE_ONE: {
              request = store.delete(value);
              request.onsuccess = () => observer.next(true);
              break;
            }
            case RequestType.SELECT_ALL: {
              request = store.getAll();
              request.onsuccess = () => observer.next(request.result);
              break;
            }
            case RequestType.UPDATE_ONE: {
              const update = value as Update<any>;
              request = store.get(update.id);
              request.onsuccess = (event: any) => {
                let data = event.target.result;
                data = {
                  ...data,
                  ...update.changes
                };

                const putRequest = store.put(data);
                putRequest.onsuccess = () => observer.next(true);
              };
              break;
            }
            default: {
              observer.error(`Unknown request type ${requestType}`);
            }
          }
        });
      })
    );
  }

  private open(): Observable<IDBDatabase> {
    const idb = this.idb;

    return Observable.create((observer: Observer<any>) => {
      const openRequest = idb.open(this.schema.name, this.schema.version);

      const onSuccess = (event: any) => {
        observer.next(event.target.result);
        observer.complete();
      };

      const onError = (err: any) => {
        console.log(err);
        observer.error(err);
      };

      const onUpgradeNeeded = (event: any) => {
        this.upgradeDatabase(event.target.result, event.oldVersion, event.newVersion);
      };

      openRequest.addEventListener(IDB_SUCCESS, onSuccess);
      openRequest.addEventListener(IDB_ERROR, onError);
      openRequest.addEventListener(IDB_UPGRADE_NEEDED, onUpgradeNeeded);

      return () => {
        openRequest.removeEventListener(IDB_SUCCESS, onSuccess);
        openRequest.removeEventListener(IDB_ERROR, onError);
        openRequest.removeEventListener(IDB_UPGRADE_NEEDED, onUpgradeNeeded);
      };
    });
  }

  private upgradeDatabase(db: IDBDatabase, oldVersion: number, newVersion: number) {
    console.log(`upgradeDatabase ${oldVersion} ${newVersion}`);
    let currentVersion = oldVersion;

    while (currentVersion++ < newVersion) {
      switch (currentVersion) {
        case 1: {
          this.upgradeToVersion1(db);
          break;
        }
        default:
          console.warn(`Unknown database version ${currentVersion}.`);
      }
    }
  }

  private upgradeToVersion1(db: IDBDatabase) {
    const store = db.createObjectStore('players', {
      autoIncrement: true,
      keyPath: 'id'
    });

    // Migrate players from localStorage if they exist there.
    const playersData = localStorage.getItem('mm-players');
    const players: Player[] = playersData ? JSON.parse(playersData) : [];

    players.forEach(player => {
      store.add(player);
    });
  }
}
