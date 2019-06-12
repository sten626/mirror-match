import { createAction, props } from '@ngrx/store';

export const changeSelectedRound = createAction(
  '[Pairings Page] Change Selected Round',
  props<{roundId: number}>()
);

export const clearMatchResult = createAction(
  '[Pairings Page] Clear Match Result',
  props<{pairingId: number}>()
);

export const createPairings = createAction(
  '[Pairings Page] Create Pairings',
  props<{roundId: number}>()
);

export const deletePairings = createAction(
  '[Pairings Page] Delete Pairings',
  props<{roundId: number}>()
);

export const selectPairing = createAction(
  '[Pairings Page] Select Pairing',
  props<{pairingId: number}>()
);
