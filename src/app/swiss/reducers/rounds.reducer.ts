import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Round } from 'app/shared';
import { RoundApiActions } from '../actions';

export interface State extends EntityState<Round> {
  completedRound: number;
  numberOfRounds: number;
}

export const adapter: EntityAdapter<Round> = createEntityAdapter<Round>();

export const initialState: State = adapter.getInitialState({
  completedRound: 0,
  numberOfRounds: 0
});

export function reducer(
  state = initialState,
  action: RoundApiActions.RoundApiActionsUnion
): State {
  switch (action.type) {
    case RoundApiActions.RoundApiActionTypes.BeginEventSuccess: {
      return {
        ...state,
        numberOfRounds: action.payload
      };
    }
    case RoundApiActions.RoundApiActionTypes.CreateRoundSuccess: {
      return adapter.addOne(action.payload, state);
    }
    // case PairingsApiActions.PairingsApiActionTypes.CreatePairingsSuccess: {
    //   const {round, pairings} = action.payload;
    //   const newPairings = {
    //     ...state.pairings,
    //   };
    //   newPairings[round] = pairings;

    //   return {
    //     ...state,
    //     pairings: newPairings
    //   };
    // }
    default: {
      return state;
    }
  }
}

export const hasTournamentStarted = (state: State) => state.numberOfRounds > 0;

export const isTournamentOver = (state: State) => state.completedRound >= state.numberOfRounds;

export const getCurrentRound = (state: State) => Math.max(...state.ids);

export const getNumberOfRounds = (state: State) => state.numberOfRounds;

export const getRoundIds = (state: State) => state.ids;
