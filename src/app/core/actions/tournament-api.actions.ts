import { createAction, props } from '@ngrx/store';

export const updateBestOfFailure = createAction(
  '[Tournament/API] Update Best of Failure',
  props<{err: any}>()
);

export const updateBestOfSuccess = createAction(
  '[Tournament/API] Update Best of Success',
  props<{bestOf: number}>()
);
