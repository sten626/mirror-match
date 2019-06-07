import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Round } from 'app/shared';
import { RoundApiActions, PairingsPageActions } from '../actions';

export interface State extends EntityState<Round> {
  completedRoundId: number;
  numberOfRounds: number;
  pairingsFilterText: string;
  selectedRoundId: number | null;
  showOutstandingOnly: boolean;
}

export const adapter: EntityAdapter<Round> = createEntityAdapter<Round>();

export const initialState: State = adapter.getInitialState({
  completedRoundId: 0,
  numberOfRounds: 0,
  pairingsFilterText: '',
  selectedRoundId: null,
  showOutstandingOnly: true
});

export function reducer(
  state = initialState,
  action: PairingsPageActions.PairingsPageActionsUnion | RoundApiActions.RoundApiActionsUnion
): State {
  switch (action.type) {
    case PairingsPageActions.PairingsPageActionTypes.UpdatePairingsFilterText: {
      return {
        ...state,
        pairingsFilterText: action.payload
      };
    }
    case PairingsPageActions.PairingsPageActionTypes.UpdateShowOutstandingOnly: {
      return {
        ...state,
        showOutstandingOnly: action.payload
      };
    }
    case RoundApiActions.RoundApiActionTypes.BeginEventSuccess: {
      return {
        ...state,
        numberOfRounds: action.payload
      };
    }
    case RoundApiActions.RoundApiActionTypes.CreatePairingsSuccess: {
      return {
        ...adapter.updateOne({
          id: action.payload.id,
          changes: {
            pairings: action.payload.pairings
          }
        }, state),
        pairingsFilterText: '',
        showOutstandingOnly: true
      };
    }
    case RoundApiActions.RoundApiActionTypes.CreateRoundSuccess: {
      return {
        ...adapter.addOne(action.payload, state),
        pairingsFilterText: '',
        showOutstandingOnly: true
      };
    }
    case RoundApiActions.RoundApiActionTypes.LoadRoundsSuccess: {
      const {rounds, numberOfRounds, selectedRoundId} = action.payload;

      return {
        ...adapter.addAll(rounds, state),
        numberOfRounds: numberOfRounds,
        selectedRoundId: selectedRoundId
      };
    }
    case RoundApiActions.RoundApiActionTypes.UpdateRoundSuccess: {
      return adapter.updateOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

// const {
//   selectIds,
//   selectEntities,
//   selectAll,
//   selectTotal
// } = adapter.getSelectors();

// export const hasTournamentStarted = (state: State) => state.numberOfRounds > 0;

// export const isTournamentOver = (state: State) => state.completedRound >= state.numberOfRounds;

// export const getAllRounds = selectAll;

export const getCompletedRoundId = (state: State) => state.completedRoundId;

// export const getCurrentRound = selectTotal;

export const getNumberOfRounds = (state: State) => state.numberOfRounds;

export const getPairingsFilterText = (state: State) => state.pairingsFilterText;

// export const getRoundEntities = selectEntities;

// export const getRoundIds = selectIds;

export const getSelectedRoundId = (state: State) => state.selectedRoundId;

export const getShowOutstandingOnly = (state: State) => state.showOutstandingOnly;
