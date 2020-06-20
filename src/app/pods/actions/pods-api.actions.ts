import { createAction, props } from '@ngrx/store';

export const loadPodsSuccess = createAction(
  '[Pods/Api] Load Pods Success',
  props<{ pods: number[][] }>()
);

export const loadPodsFailure = createAction(
  '[Pods/API] Load Pods Failure',
  props<{ error: any }>()
);
