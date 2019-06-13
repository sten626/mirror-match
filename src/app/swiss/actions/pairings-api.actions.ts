import { createAction, props } from '@ngrx/store';
import { Pairing } from 'app/shared';

export const addPairings = createAction(
  '[Pairings/API] Add Pairings',
  props<{pairings: Pairing[]}>()
);

export const createPairingsSuccess = createAction(
  '[Pairings/API] Create Pairings Success',
  props<{pairings: Pairing[], roundId: number}>()
);

export const deletePairingsSuccess = createAction(
  '[Pairings/API] Delete Pairings Success',
  props<{pairingIds: number[], roundId: number}>()
);

export const loadPairings = createAction(
  '[Pairings/API] Load Pairings'
);

export const loadPairingsSuccess = createAction(
  '[Pairings/API] Load Pairings Success',
  props<{pairings: Pairing[]}>()
);
