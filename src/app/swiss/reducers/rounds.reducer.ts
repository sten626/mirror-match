import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Round } from 'app/shared';
import { RoundApiActions, PairingsApiActions } from '../actions';

export interface State extends EntityState<Round> {
  completedRoundId: number;
  loaded: boolean;
  numberOfRounds: number;
  selectedPairingId: number | null;
  selectedRoundId: number | null;
}

export const adapter: EntityAdapter<Round> = createEntityAdapter<Round>();

export const initialState: State = adapter.getInitialState({
  completedRoundId: 0,
  loaded: false,
  numberOfRounds: 0,
  selectedPairingId: null,
  selectedRoundId: null,
});

export const reducer = createReducer(
  initialState,
  on(PairingsApiActions.deletePairingsSuccess, (state, {roundId}) => adapter.updateOne({
    id: roundId,
    changes: {
      pairingIds: []
    }
  }, state)),
  on(RoundApiActions.addRound, (state, {round}) => adapter.addOne(round, {
    ...state,
    selectedRoundId: round.id
  })),
  on(RoundApiActions.beginEventSuccess, (state, {numberOfRounds}) => ({
    ...state,
    numberOfRounds: numberOfRounds
  })),
  on(RoundApiActions.loadRoundsSuccess, (state, {completedRoundId, numberOfRounds, rounds, selectedRoundId}) => adapter.addAll(rounds, {
    ...state,
    completedRoundId: completedRoundId,
    numberOfRounds: numberOfRounds,
    loaded: true,
    selectedRoundId: selectedRoundId
  })),
  on(RoundApiActions.setCompletedRoundSuccess, (state, {roundId}) => ({
    ...state,
    completedRoundId: roundId
  })),
  on(RoundApiActions.updateRound, (state, {round}) => adapter.updateOne(round, {
    ...state,
    pairingsFilterText: '',
    showOutstandingOnly: true
  }))
);

// export function reducer(
//   state = initialState,
//   action:
//     PairingsPageActions.PairingsPageActionsUnion
//     | RoundApiActions.RoundApiActionsUnion
// ): State {
//   switch (action.type) {
//     case RoundApiActions.RoundApiActionTypes.CreateRoundSuccess: {
//       return {
//         ...adapter.addOne(action.payload, state),
//         pairingsFilterText: '',
//         showOutstandingOnly: true
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// }

export const getCompletedRoundId = (state: State) => state.completedRoundId;

export const getNumberOfRounds = (state: State) => state.numberOfRounds;

export const getSelectedPairingId = (state: State) => state.selectedPairingId;

export const getSelectedRoundId = (state: State) => state.selectedRoundId;

export const isLoaded = (state: State) => state.loaded;
