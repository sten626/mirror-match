import { Injectable } from '@angular/core';

@Injectable()
export class IndexedDbService {
  readonly DB_NAME = 'mirrormatch';
  readonly DB_VERSION = 1;

  private db: IDBDatabase;

  constructor() {
    this.openDb();
  }

  private openDb(): void {
    const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

    request.onsuccess = () => {
      this.db = request.result;
      console.log('openDb done');
    };

    request.onerror = (event) => {
      console.error('openDb: ', event.target['errorCode']);
    };

    request.onupgradeneeded = () => {
      console.log('openDb.onupgradeneeded');
      event.currentTarget['result'].createObjectStore('players', {keyPath: 'id', autoIncrement: true});
    };
  }
}
