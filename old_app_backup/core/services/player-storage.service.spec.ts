import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE_TOKEN } from '@mm/core/services/storage.service';
import { Player } from '@mm/shared/models';
import { Update } from '@ngrx/entity';
import {
  duplicatePlayerNameError,
  PlayerStorageService,
  updateInvalidIdError,
} from './player-storage.service';

describe('PlayerStorageService', () => {
  let service: PlayerStorageService;
  let storageSpy: any;
  const players = [
    {
      id: 1,
      name: 'Spike',
      dropped: false,
    },
  ];

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', [
      'getItem',
      'removeItem',
      'setItem',
    ]);
    storageSpy.getItem.and.returnValue(JSON.stringify(players));

    TestBed.configureTestingModule({
      providers: [
        PlayerStorageService,
        { provide: LOCAL_STORAGE_TOKEN, useValue: storageSpy },
      ],
    });

    service = TestBed.inject(PlayerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addPlayer', () => {
    it('should call setItem and assign an ID when adding a player', (done: DoneFn) => {
      const player: Player = {
        name: 'Sten',
        dropped: false,
      };

      service.addPlayer(player).subscribe((result) => {
        expect(result).toEqual({
          ...player,
          id: 2,
        });
        expect(storageSpy.setItem).toHaveBeenCalled();
        done();
      });
    });

    it('should override any ID given with the correct next ID', (done: DoneFn) => {
      const player: Player = {
        id: 5,
        name: 'Sten',
        dropped: false,
      };

      service.addPlayer(player).subscribe((result) => {
        expect(result).toEqual({
          ...player,
          id: 2,
        });
        expect(storageSpy.setItem).toHaveBeenCalled();
        done();
      });
    });

    it('should give the player ID 1 if there are no players', (done: DoneFn) => {
      storageSpy.getItem.and.returnValue('');
      const player: Player = {
        name: 'Sten',
        dropped: false,
      };

      service.addPlayer(player).subscribe((result) => {
        expect(result).toEqual({
          ...player,
          id: 1,
        });
        expect(storageSpy.setItem).toHaveBeenCalled();
        done();
      });
    });

    it('should throw an error if the given player name already exists', (done: DoneFn) => {
      const player: Player = {
        name: 'Spike',
        dropped: false,
      };

      service.addPlayer(player).subscribe(
        () => {
          fail('Did not return an error.');
          done();
        },
        (err) => {
          expect(err).toBe(duplicatePlayerNameError);
          expect(storageSpy.setItem).toHaveBeenCalledTimes(0);
          done();
        }
      );
    });
  });

  describe('deletePlayer', () => {
    it('should return the ID of the deleted player', (done: DoneFn) => {
      const playerId = 1;
      service.deletePlayer(playerId).subscribe((result) => {
        expect(result).toBe(playerId);
        expect(storageSpy.setItem).toHaveBeenCalled();
        done();
      });
    });

    it('should behave the same when called with a nonexistent ID', (done: DoneFn) => {
      const playerId = 5;
      service.deletePlayer(playerId).subscribe((result) => {
        expect(result).toBe(playerId);
        expect(storageSpy.setItem).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getPlayers', () => {
    it('should return the list of players in storage', (done: DoneFn) => {
      service.getPlayers().subscribe((result) => {
        expect(result).toEqual(players);
        expect(storageSpy.getItem).toHaveBeenCalledWith('mm-players');
        done();
      });
    });
  });

  describe('updatePlayer', () => {
    it('should throw an error when called with nonexistent ID', (done: DoneFn) => {
      const update: Update<Player> = {
        id: 5,
        changes: {
          name: 'Sten',
        },
      };

      service.updatePlayer(update).subscribe(
        () => {
          fail();
        },
        (err) => {
          expect(err).toEqual(updateInvalidIdError);
          done();
        }
      );
    });

    it('should update a player', (done: DoneFn) => {
      service
        .updatePlayer({
          id: 1,
          changes: {
            dropped: true,
          },
        })
        .subscribe((player) => {
          expect(player.dropped).toBeTrue();
          expect(storageSpy.setItem).toHaveBeenCalled();
          done();
        });
    });
  });
});
