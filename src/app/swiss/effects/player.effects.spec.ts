import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { generateMockPlayer, Player, PlayerStorageService } from '@app/shared';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { PlayersApiActions, PlayersPageActions } from '../actions';
import { PlayerEffects } from './player.effects';

describe('PlayerEffects', () => {
  const player1 = generateMockPlayer();
  const player1NoId: Player = {
    ...player1,
    id: null,
  };
  let actions$: Observable<any>;
  let effects: PlayerEffects;
  const storageSpy = jasmine.createSpyObj('PlayerStorageService', [
    'addPlayer',
    'getPlayers',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PlayerStorageService, useValue: storageSpy },
        PlayerEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(PlayerEffects);
    actions$ = TestBed.inject(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('addPlayer', () => {
    it('should create an addPlayerSuccess', () => {
      const action = PlayersPageActions.addPlayer({ player: player1NoId });
      const completion = PlayersApiActions.addPlayerSuccess({
        player: player1,
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: player1 });
      const expected = cold('--c', { c: completion });
      storageSpy.addPlayer.and.returnValue(response);

      expect(effects.addPlayer$).toBeObservable(expected);
      expect(storageSpy.addPlayer).toHaveBeenCalledWith(player1NoId);
    });

    it('should create an addPlayerFailure when addPlayer throws an error', () => {
      const action = PlayersPageActions.addPlayer({ player: player1NoId });
      const error = 'Cannot add nonexistent player.';
      const completion = PlayersApiActions.addPlayerFailure({
        player: player1NoId,
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      storageSpy.addPlayer.and.returnValue(response);

      expect(effects.addPlayer$).toBeObservable(expected);
    });
  });
});
