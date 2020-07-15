import { TournamentApiActions } from '@app/core/actions';
import { TournamentInfo } from '@app/shared/models';
import { initialState, reducer } from './tournament.reducer';

describe('Tournament Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('setTournamentInfoSuccess', () => {
    it('should set all values to the state', () => {
      const tournamentInfo: TournamentInfo = {
        bestOf: 3,
        hasDraftStarted: false,
        hasSwissStarted: false,
        isDraft: false,
        totalRounds: 3
      };
      const action = TournamentApiActions.setTournamentInfoSuccess({
        tournamentInfo
      });
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        ...tournamentInfo
      });
    });
  });
});
