import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pairing } from 'app/shared';
import { PairingsApiActions, RoundApiActions } from '../actions';

export interface State extends EntityState<Pairing> {
  selectedPairingId: number | null;
}

export const adapter: EntityAdapter<Pairing> = createEntityAdapter<Pairing>();

export const initialState: State = adapter.getInitialState({
  selectedPairingId: null
});

export function reducer(
  state = initialState,
  action: PairingsApiActions.PairingsApiActionsUnion | RoundApiActions.RoundApiActionsUnion
): State {
  switch (action.type) {
    // case (PairingsApiActions.PairingsApiActionTypes.DeletePairingsSuccess): {
    //   return adapter.removeMany(action.payload, state);
    // }
    case (PairingsApiActions.PairingsApiActionTypes.LoadPairingsSuccess): {
      return adapter.addAll(action.payload, state);
    }
    case (RoundApiActions.RoundApiActionTypes.AddPairingsSuccess): {
      const pairings = action.payload.pairings;
      return adapter.addMany(pairings, state);
    }
    case (RoundApiActions.RoundApiActionTypes.RedoMatchesSuccess): {
      const pairingIds = action.payload.pairingIds;

      return adapter.removeMany(pairingIds, state);
    }
    default: {
      return state;
    }
  }
}

export const getSelectedPairingId = (state: State) => state.selectedPairingId;
