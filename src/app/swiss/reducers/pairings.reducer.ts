import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pairing } from 'app/shared';
import { PairingsApiActions } from '../actions';

export interface State extends EntityState<Pairing> {
  selectedPairingId: number | null;
}

export const adapter: EntityAdapter<Pairing> = createEntityAdapter<Pairing>();

export const initialState: State = adapter.getInitialState({
  selectedPairingId: null
});

export function reducer(
  state = initialState,
  action: PairingsApiActions.PairingsApiActionsUnion
): State {
  switch (action.type) {
    case (PairingsApiActions.PairingsApiActionTypes.LoadPairingsSuccess): {
      return adapter.addAll(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

export const getSelectedPairingId = (state: State) => state.selectedPairingId;
