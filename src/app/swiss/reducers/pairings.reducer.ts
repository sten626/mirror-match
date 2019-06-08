import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pairing } from 'app/shared';

export interface State extends EntityState<Pairing> {
  selectedPairingId: string | null;
}

export const adapter: EntityAdapter<Pairing> = createEntityAdapter<Pairing>({
  selectId: (pairing: Pairing) => `${pairing.roundId}-${pairing.table}`
});

export const initialState: State = adapter.getInitialState({
  selectedPairingId: null
});

export function reducer(
  state = initialState,
  action
): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getSelectedPairingId = (state: State) => state.selectedPairingId;
