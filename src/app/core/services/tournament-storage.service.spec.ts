import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE_TOKEN } from '@app/core/services/storage.service';
import { TournamentInfo } from '@app/shared/models';
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

  describe('setTournamentInfo', () => {
    it('should set and return the value', (done: DoneFn) => {
      const tournamentInfo: TournamentInfo = {
        bestOf: 3,
        hasDraftStarted: true,
        hasSwissStarted: false,
        isDraft: true,
        totalRounds: 5
      };
      service.setTournamentInfo(tournamentInfo).subscribe((result) => {
        expect(result).toEqual(tournamentInfo);
        expect(storageSpy.setItem).toHaveBeenCalledWith(
          'mm-tournament-info',
          JSON.stringify(tournamentInfo)
        );
        done();
      });
    });
  });
});
