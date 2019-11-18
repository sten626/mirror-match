import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Player, PlayerStorageService } from 'app/shared';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { PlayersApiActions, PlayersPageActions } from '../actions';
import { PlayerEffects } from './player.effects';

describe('PlayerEffects', () => {
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
      const action = PlayersPageActions.addPlayer({
        playerName: 'Steven'
      });
      const player: Player = {
        id: 1,
        name: 'Steven',
        dropped: false
      };
      const completion = PlayersApiActions.addPlayerSuccess({
        'player': player
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: player });
      const expected = cold('--c', { c: completion });
      storageSpy.addPlayer.and.returnValue(response);

      expect(effects.addPlayer$).toBeObservable(expected);
      expect(storageSpy.addPlayer).toHaveBeenCalledWith(player);
    });

    it('should create an addPlayerFailure when addPlayer throws an error', () => {
      const playerName = 'Steven';
      const action = PlayersPageActions.addPlayer({ playerName });
      const error = 'Cannot add nonexistent player.';
      const completion = PlayersApiActions.addPlayerFailure({ playerName });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      storageSpy.addPlayer.and.returnValue(response);

      expect(effects.addPlayer$).toBeObservable(expected);
    });
  });
});
