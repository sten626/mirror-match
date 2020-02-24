import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE_TOKEN } from '@app/core/services/storage.service';
import { Player } from '@app/shared/models';
import { PlayerStorageService } from './player-storage.service';

describe('PlayerStorageService', () => {
  let service: PlayerStorageService;
  let storageSpy: any;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', [
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
        expect(storageSpy.setItem).toHaveBeenCalledTimes(0);
        done();
      });
    });

    it('should call setItem and assign an ID when adding a player', (done: DoneFn) => {
      const player: Player = {
        id: null,
        name: 'Sten',
        dropped: false
      };

      service.addPlayer(player).subscribe(result => {
        expect(result).toEqual({
          ...player,
          id: 2
        });
        expect(storageSpy.setItem).toHaveBeenCalled();
        done();
      });
    });

    it('should override any ID given with the correct next ID', (done: DoneFn) => {
      const player: Player = {
        id: 5,
        name: 'Sten',
        dropped: false
      };

      service.addPlayer(player).subscribe(result => {
        expect(result).toEqual({
          ...player,
          id: 2
        });
        expect(storageSpy.setItem).toHaveBeenCalled();
        done();
      });
    });
  });
});
