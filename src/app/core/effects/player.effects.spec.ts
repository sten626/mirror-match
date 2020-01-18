import { TestBed } from '@angular/core/testing';
import { PlayersApiActions } from '@app/core/actions';
import { PlayerStorageService } from '@app/core/services';
import { SetupPageActions } from '@app/setup/actions';
import { generateMockPlayer, Player } from '@app/shared/models';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { PlayerEffects } from './player.effects';

describe('PlayerEffects', () => {
  const player1 = generateMockPlayer();
  const player1NoId: Player = {
    ...player1,
    id: null
  };
  let actions$: Observable<any>;
  let effects: PlayerEffects;
  const storageSpy = jasmine.createSpyObj(
    'PlayerStorageService', [
      'addPlayer',
      'getPlayers'
    ]
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PlayerStorageService, useValue: storageSpy },
        PlayerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PlayerEffects);
    actions$ = TestBed.get(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('addPlayer', () => {
    it('should create an addPlayerSuccess', () => {
      const action = SetupPageActions.addPlayer({ player: player1NoId });
      const completion = PlayersApiActions.addPlayerSuccess({ player: player1 });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: player1 });
      const expected = cold('--c', { c: completion });
      storageSpy.addPlayer.and.returnValue(response);

      expect(effects.addPlayer$).toBeObservable(expected);
      expect(storageSpy.addPlayer).toHaveBeenCalledWith(player1NoId);
    });

    it('should create an addPlayerFailure when addPlayer throws an error', () => {
      const action = SetupPageActions.addPlayer({ player: player1NoId });
      const error = 'Cannot add nonexistent player.';
      const completion = PlayersApiActions.addPlayerFailure({ player: player1NoId });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      storageSpy.addPlayer.and.returnValue(response);

      expect(effects.addPlayer$).toBeObservable(expected);
    });
  });
});
