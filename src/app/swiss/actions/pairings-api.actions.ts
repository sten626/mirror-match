import { Action, createAction, props } from '@ngrx/store';
import { Pairing } from 'app/shared';

export enum PairingsApiActionTypes {
  LoadPairings = '[Pairings/API] Load Pairings',
  LoadPairingsFailure = '[Pairings/API] Load Pairings Failure',
  LoadPairingsSuccess = '[Pairings/API] Load Pairings Success'
}

export const addPairings = createAction(
  '[Pairings/API] Add Pairings',
  props<{pairings: Pairing[]}>()
);

export const createPairingsSuccess = createAction(
  '[Pairings/API] Create Pairings Success',
  props<{pairings: Pairing[], roundId: number}>()
);

export class LoadPairings implements Action {
  readonly type = PairingsApiActionTypes.LoadPairings;
}

export class LoadPairingsFailure implements Action {
  readonly type = PairingsApiActionTypes.LoadPairingsFailure;

  constructor(public payload: any) {}
}

export class LoadPairingsSuccess implements Action {
  readonly type = PairingsApiActionTypes.LoadPairingsSuccess;

  constructor(public payload: Pairing[]) {}
}

export type PairingsApiActionsUnion =
  | LoadPairings
  | LoadPairingsFailure
  | LoadPairingsSuccess;
