import { createAction, props } from '@ngrx/store';
import { Pairing } from 'app/shared';

export const changeSelectedRound = createAction(
  '[Pairings Page] Change Selected Round',
  props<{roundId: number}>()
);

export const clearMatchResult = createAction(
  '[Pairings Page] Clear Match Result',
  props<{pairing: Pairing}>()
);

export const clearResults = createAction(
  '[Pairings Page] Clear Results',
  props<{pairings: Pairing[]}>()
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

export const submitResult = createAction(
  '[Pairings Page] Submit Result',
  props<{pairing: Pairing}>()
);
