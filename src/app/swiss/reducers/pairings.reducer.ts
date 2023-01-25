import { Pairing } from '@mm/shared/models';
import {
  PairingsApiActions,
  PairingsPageActions,
  SwissApiActions,
} from '@mm/swiss/actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const pairingsFeatureKey = 'pairings';

export interface State extends EntityState<Pairing> {
  selectedPairingId: number | null;
}

export const adapter: EntityAdapter<Pairing> = createEntityAdapter<Pairing>();

export const initialState: State = adapter.getInitialState({
  selectedPairingId: null,
});

export const reducer = createReducer(
  initialState,
  on(PairingsApiActions.addPairings, (state, { pairings }) =>
    adapter.addMany(pairings, state)
  ),
  on(PairingsApiActions.clearMatchResultSuccess, (state, { pairing }) =>
    adapter.updateOne(pairing, state)
  ),
  on(PairingsApiActions.clearResultsSuccess, (state, { pairings }) =>
    adapter.updateMany(pairings, state)
  ),
  on(PairingsApiActions.deletePairingsSuccess, (state, { pairingIds }) =>
    adapter.removeMany(pairingIds, state)
  ),
  on(PairingsApiActions.loadPairingsSuccess, (state, { pairings }) =>
    adapter.setAll(pairings, state)
  ),
  on(PairingsApiActions.submitResultSuccess, (state, { pairing }) =>
    adapter.updateOne(pairing, {
      ...state,
      selectedPairingId: null,
    })
  ),
  on(PairingsPageActions.selectPairing, (state, { pairingId }) => ({
    ...state,
    selectedPairingId: pairingId,
  })),
  on(SwissApiActions.clearAllDataSuccess, (state) =>
    adapter.removeAll({
      ...state,
      selectedPairingId: null,
    })
  )
);

export const getSelectedPairingId = (state: State) => state.selectedPairingId;
