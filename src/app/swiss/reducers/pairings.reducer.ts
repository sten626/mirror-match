import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pairing } from 'app/shared';
import { PairingsApiActions } from '../actions';
import { createReducer, on } from '@ngrx/store';

export interface State extends EntityState<Pairing> {}

export const adapter: EntityAdapter<Pairing> = createEntityAdapter<Pairing>();

export const initialState: State = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(PairingsApiActions.addPairings, (state, {pairings}) => adapter.addMany(pairings, state)),
  on(PairingsApiActions.clearResultsSuccess, (state, {pairings}) => adapter.updateMany(pairings, state)),
  on(PairingsApiActions.deletePairingsSuccess, (state, {pairingIds}) => adapter.removeMany(pairingIds, state)),
  on(PairingsApiActions.loadPairingsSuccess, (state, {pairings}) => adapter.addAll(pairings, state))
);
