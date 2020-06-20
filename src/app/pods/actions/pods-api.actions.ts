import { Pod } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadPodsSuccess = createAction(
  '[Pods/Api] Load Pods Success',
  props<{ pods: Pod[] }>()
);

export const loadPodsFailure = createAction(
  '[Pods/API] Load Pods Failure',
  props<{ error: any }>()
);

export const setPodsSuccess = createAction(
  '[Pods/API] Set Pods Success',
  props<{ pods: Pod[] }>()
);

export const setPodsFailure = createAction(
  '[Pods/API] Set Pods Failure',
  props<{ error: any }>()
);
