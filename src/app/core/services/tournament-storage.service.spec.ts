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
        expect(storageSpy.setItem).toHaveBeenCalledWith('mm-best-of', JSON.stringify(value));
        done();
      });
    });
  });

  describe('setIsDraft', () => {
    it('should set and return the value', (done: DoneFn) => {
      const value = true;
      service.setIsDraft(value).subscribe(result => {
        expect(result).toBe(value);
        expect(storageSpy.setItem).toHaveBeenCalledWith('mm-is-draft', JSON.stringify(value));
        done();
      });
    });
  });

  describe('setTotalRounds', () => {
    it('should set and return the value', (done: DoneFn) => {
      const value = 4;
      service.setTotalRounds(value).subscribe(result => {
        expect(result).toBe(value);
        expect(storageSpy.setItem).toHaveBeenCalledWith('mm-total-rounds', JSON.stringify(value));
        done();
      });
    });
  });
});
