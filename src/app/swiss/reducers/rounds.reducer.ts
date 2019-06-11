import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Round } from 'app/shared';
import { PairingsPageActions, RoundApiActions } from '../actions';

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

export function reducer(
  state = initialState,
  action:
    PairingsPageActions.PairingsPageActionsUnion
    | RoundApiActions.RoundApiActionsUnion
): State {
  switch (action.type) {
    case PairingsPageActions.PairingsPageActionTypes.SelectPairing: {
      return {
        ...state,
        selectedPairingId: action.payload
      };
    }
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
    case RoundApiActions.RoundApiActionTypes.AddPairingsSuccess: {
      const {roundId, pairings} = action.payload;
      const pairingIds = pairings.map(pairing => pairing.id);
      return {
        ...adapter.updateOne({
          id: roundId,
          changes: {
            pairingIds: pairingIds
          }
        }, state),
        pairingsFilterText: '',
        showOutstandingOnly: true
      };
    }
    case RoundApiActions.RoundApiActionTypes.BeginEventSuccess: {
      return {
        ...state,
        numberOfRounds: action.payload
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
        loaded: true,
        numberOfRounds: numberOfRounds,
        selectedRoundId: selectedRoundId
      };
    }
    case RoundApiActions.RoundApiActionTypes.RedoMatchesSuccess: {
      const roundId = action.payload.roundId;

      return adapter.updateOne({
        id: roundId,
        changes: {
          pairingIds: []
        }
      }, state);
    }
    case RoundApiActions.RoundApiActionTypes.UpdateRoundSuccess: {
      return adapter.updateOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

export const getCompletedRoundId = (state: State) => state.completedRoundId;

export const getNumberOfRounds = (state: State) => state.numberOfRounds;

export const getPairingsFilterText = (state: State) => state.pairingsFilterText;

export const getSelectedPairingId = (state: State) => state.selectedPairingId;

export const getSelectedRoundId = (state: State) => state.selectedRoundId;

export const getShowOutstandingOnly = (state: State) => state.showOutstandingOnly;

export const isLoaded = (state: State) => state.loaded;
