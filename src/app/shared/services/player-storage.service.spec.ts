import { TestBed } from '@angular/core/testing';
import { Player } from 'app/shared/models';
import { PlayerStorageService } from './player-storage.service';
import { of } from 'rxjs';

describe('PlayerStorageService', () => {
  let service: PlayerStorageService;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('Storage', [
      'getItem',
      'setItem'
    ]);

    TestBed.configureTestingModule({
      providers: [
        PlayerStorageService,
        { provide: Storage, useValue: storageSpy }
      ]
    });

    service = TestBed.get(PlayerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addPlayer', () => {
    it('should not change the passed in ID', () => {
      const player: Player = {
        id: 5,
        name: 'Steven',
        dropped: false
      };
      const expected = of(player);
      const result = service.addPlayer(player);
      expect(result).toBeObservable(expected);
    });
  });
});
