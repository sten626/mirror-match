import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Round } from 'app/shared';
import { RoundApiActions } from '../actions';

export interface State extends EntityState<Round> {
  completedRoundId: number;
  loaded: boolean;
  numberOfRounds: number;
  pairingsFilterText: string;
  selectedPairingId: number | null;
  selectedRoundId: number | null;
  showOutstandingOnly: boolean;
}

export const adapter: EntityAdapter<Round> = createEntityAdapter<Round>();

export const initialState: State = adapter.getInitialState({
  completedRoundId: 0,
  loaded: false,
  numberOfRounds: 0,
  pairingsFilterText: '',
  selectedPairingId: null,
  selectedRoundId: null,
  showOutstandingOnly: true
});

export const reducer = createReducer(
  initialState,
  on(RoundApiActions.addRound, (state, {round}) => adapter.addOne(round, state)),
  on(RoundApiActions.beginEventSuccess, (state, {numberOfRounds}) => ({
    ...state,
    numberOfRounds: numberOfRounds
  })),
  on(RoundApiActions.loadRoundsSuccess, (state, {numberOfRounds, rounds, selectedRoundId}) => adapter.addAll(rounds, {
    ...state,
    numberOfRounds: numberOfRounds,
    loaded: true,
    selectedRoundId: selectedRoundId
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
//     case PairingsPageActions.PairingsPageActionTypes.SelectPairing: {
//       return {
//         ...state,
//         selectedPairingId: action.payload
//       };
//     }
//     case PairingsPageActions.PairingsPageActionTypes.UpdatePairingsFilterText: {
//       return {
//         ...state,
//         pairingsFilterText: action.payload
//       };
//     }
//     case PairingsPageActions.PairingsPageActionTypes.UpdateShowOutstandingOnly: {
//       return {
//         ...state,
//         showOutstandingOnly: action.payload
//       };
//     }
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

export const getPairingsFilterText = (state: State) => state.pairingsFilterText;

export const getSelectedPairingId = (state: State) => state.selectedPairingId;

export const getSelectedRoundId = (state: State) => state.selectedRoundId;

export const getShowOutstandingOnly = (state: State) => state.showOutstandingOnly;

export const isLoaded = (state: State) => state.loaded;
