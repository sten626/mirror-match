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
