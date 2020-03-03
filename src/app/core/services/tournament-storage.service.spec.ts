import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE_TOKEN } from '@app/core/services/storage.service';
import { TournamentStorageService } from './tournament-storage.service';

describe('TournamentStorageService', () => {
  let service: TournamentStorageService;
  let storageSpy: any;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', [
      'getItem',
      'removeItem',
      'setItem'
    ]);
    TestBed.configureTestingModule({
      providers: [
        TournamentStorageService,
        { provide: LOCAL_STORAGE_TOKEN, useValue: storageSpy }
      ]
    });

    service = TestBed.get(TournamentStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setBestOf', () => {
    it('should set and return the value', (done: DoneFn) => {
      const value = 5;
      service.setBestOf(value).subscribe(result => {
        expect(result).toBe(value);
        expect(storageSpy.setItem).toHaveBeenCalledWith('mm-best-of', value.toString());
        done();
      });
    });
  });
});
