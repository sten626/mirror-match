import { Pod } from '@app/core/reducers/tournament.reducer';
import { createAction, props } from '@ngrx/store';

export const startDraftFailure = createAction(
  '[Tournament/API] Start Draft Failure',
  props<{err: any}>()
);

export const startDraftSuccess = createAction(
  '[Tournament/API] Start Draft Success',
  props<{pods: Pod[]}>()
);

export const startTournamentFailure = createAction(
  '[Tournament/API] Start Tournament Failure',
  props<{err: any}>()
);

export const startTournamentSuccess = createAction(
  '[Tournament/API] Start Tournament Success',
  props<{bestOf: number, isDraft: boolean, totalRounds: number}>()
);
