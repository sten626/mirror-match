import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Round } from 'app/shared';
import { RoundApiActions } from '../actions';

export interface State extends EntityState<Round> {
  completedRound: number;
  numberOfRounds: number;
  selectedRound: number;
}

export const adapter: EntityAdapter<Round> = createEntityAdapter<Round>();

export const initialState: State = adapter.getInitialState({
  completedRound: 0,
  numberOfRounds: 0,
  selectedRound: 1
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
    case RoundApiActions.RoundApiActionTypes.CreatePairingsSuccess: {
      return adapter.updateOne({
        id: action.payload.id,
        changes: {
          pairings: action.payload.pairings
        }
      }, state);
    }
    case RoundApiActions.RoundApiActionTypes.CreateRoundSuccess: {
      return adapter.addOne(action.payload, state);
    }
    case RoundApiActions.RoundApiActionTypes.LoadRoundsSuccess: {
      const {rounds, numberOfRounds, selectedRound} = action.payload;

      return {
        ...adapter.addAll(rounds, state),
        numberOfRounds: numberOfRounds,
        selectedRound: selectedRound
      };
    }
    default: {
      return state;
    }
  }
}

export const hasTournamentStarted = (state: State) => state.numberOfRounds > 0;

export const isTournamentOver = (state: State) => state.completedRound >= state.numberOfRounds;

export const getCurrentRound = (state: State) => state.ids[state.ids.length - 1] as number;

export const getNumberOfRounds = (state: State) => state.numberOfRounds;

export const getRoundIds = (state: State) => state.ids as number[];

export const getSelectedRound = (state: State) => state.selectedRound;
