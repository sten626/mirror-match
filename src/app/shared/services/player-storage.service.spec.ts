import { TestBed } from '@angular/core/testing';
import { Player } from 'app/shared/models';
import { PlayerStorageService } from './player-storage.service';
import { LOCAL_STORAGE_TOKEN } from './storage.service';

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

    it('should not change the passed in ID', (done: DoneFn) => {
      const player: Player = {
        id: 5,
        name: 'Steven',
        dropped: false
      };

      service.addPlayer(player).subscribe(value => {
        expect(value).toEqual(player);
        done();
      });
    });
  });
});
