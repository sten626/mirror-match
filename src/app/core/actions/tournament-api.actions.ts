import { createAction, props } from '@ngrx/store';

export const startTournamentFailure = createAction(
  '[Tournament/API] Start Tournament Failure',
  props<{err: any}>()
);

export const startTournamentSuccess = createAction(
  '[Tournament/API] Start Tournament Success',
  props<{bestOf: number, isDraft: boolean, totalRounds: number}>()
);
