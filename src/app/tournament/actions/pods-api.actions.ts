import { Pod } from '@mm/shared/models';
import { createAction, props } from '@ngrx/store';

export const createDraftPods = createAction('[Pods/API] Create Draft Pods');

export const createDraftPodsSuccess = createAction(
  '[Pods/API] Create Draft Pods Success',
  props<{ pods: Pod[] }>()
);

export const createDraftPodsFailure = createAction(
  '[Pods/API] Create Draft Pods Failure',
  props<{ error: any }>()
);

export const loadPodsSuccess = createAction(
  '[Pods/API] Load Pods Success',
  props<{ pods: Pod[] }>()
);

export const loadPodsFailure = createAction(
  '[Pods/API] Load Pods Failure',
  props<{ error: any }>()
);

export const setDraftPodsSuccess = createAction(
  '[Pods/API] Set Draft Pods Success',
  props<{ pods: Pod[] }>()
);

export const setDraftPodsFailure = createAction(
  '[Pods/API] Set Draft Pods Failure',
  props<{ error: any }>()
);
