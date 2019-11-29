import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { getSchema } from './schema';

const IDB_ERROR = 'error';
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

  open(): Observable<IDBDatabase> {
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
        this.upgradeDatabase(event.target.result);
      };

      // TODO Upgrade

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

  private upgradeDatabase(db: IDBDatabase) {
    for (const [name, store] of this.schema.stores) {
      db.createObjectStore(name, {
        autoIncrement: store.autoIncrement,
        keyPath: store.primaryKey
      });
    }
  }
}
