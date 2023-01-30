import * as fromRounds from '@mm/swiss/reducers/rounds.reducer';
import { RoundApiActions } from '@mm/swiss/actions';

describe('RoundsReducer', () => {
  let initialState: fromRounds.State;

  beforeEach(() => {
    initialState = fromRounds.initialState;
  });

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = fromRounds.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('Set Selected Round', () => {
    it('should set the roundId and clear the pairingId', () => {
      const state: fromRounds.State = {
        ...initialState,
        selectedPairingId: 1,
        selectedRoundId: 2
      };
      const action = RoundApiActions.setSelectedRound({ roundId: 3 });
      const result = fromRounds.reducer(state, action);

      expect(result.selectedRoundId).toBe(3);
      expect(result.selectedPairingId).toBe(null);
    });
  });

  it('should clear the roundId and pairingId when passing null', () => {
    const state: fromRounds.State = {
      ...initialState,
      selectedPairingId: 1,
      selectedRoundId: 2
    };
    const action = RoundApiActions.setSelectedRound({ roundId: null });
    const result = fromRounds.reducer(state, action);

    expect(result.selectedRoundId).toBe(null);
    expect(result.selectedPairingId).toBe(null);
  });
});
