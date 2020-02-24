import { reducer, initialState } from './tournament.reducer';
import { TournamentApiActions } from '@app/core/actions';


describe('Tournament Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('startTournamentSuccess', () => {
    it('should set all 3 values to the state', () => {
      const action = TournamentApiActions.startTournamentSuccess({
        bestOf: 3,
        isDraft: false,
        totalRounds: 3
      });
      const state = reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        bestOf: 3,
        isDraft: false,
        totalRounds: 3
      });
    });
  });
});
