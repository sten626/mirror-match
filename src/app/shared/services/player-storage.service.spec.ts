import { TestBed } from '@angular/core/testing';
import { PlayerStorageService } from './player-storage.service';
import { LOCAL_STORAGE_TOKEN } from './storage.service';

describe('PlayerStorageService', () => {
  let service: PlayerStorageService;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('Storage', ['getItem', 'setItem']);
    const players = [
      {
        id: 1,
        name: 'Spike',
        dropped: false,
      },
    ];
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

  // Test no longer makes sense since TS doesn't allow passing null.
  // describe('addPlayer', () => {
  //   it('should throw an error when passed a null player', (done: DoneFn) => {
  //     service.addPlayer(null).subscribe(
  //       () => {
  //         fail();
  //       },
  //       (error) => {
  //         expect(error).toBe('Cannot add nonexistent player.');
  //         done();
  //       }
  //     );
  //   });
  // });
});
