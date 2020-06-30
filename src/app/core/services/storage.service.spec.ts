import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE_TOKEN, StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let storageSpy: any;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', [
      'getItem',
      'removeItem',
      'setItem'
    ]);

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: LOCAL_STORAGE_TOKEN, useValue: storageSpy }
      ]
    });

    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
