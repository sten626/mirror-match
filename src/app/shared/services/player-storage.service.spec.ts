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
    storageSpy.getItem.and.returnValue('');

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
