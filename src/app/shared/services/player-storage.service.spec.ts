import { TestBed } from '@angular/core/testing';
import { PlayerStorageService } from 'app/shared/services/player-storage.service';
import { LOCAL_STORAGE_TOKEN } from 'app/shared/services/storage.service';

describe('PlayerStorageService', () => {
  let service: PlayerStorageService;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('Storage', [
      'getItem',
      'setItem'
    ]);
    const players = [{
      id: 1,
      name: 'Spike',
      dropped: false
    }];
    storageSpy.getItem.and.returnValue(JSON.stringify(players));

    TestBed.configureTestingModule({
      providers: [
        PlayerStorageService,
        { provide: LOCAL_STORAGE_TOKEN, useValue: storageSpy }
      ]
    });

    service = TestBed.get(PlayerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addPlayer', () => {
    it('should throw an error when passed a null player', (done: DoneFn) => {
      service.addPlayer(null).subscribe(() => {
        fail();
      }, error => {
        expect(error).toBe('Cannot add nonexistent player.');
        done();
      });
    });
  });
});
