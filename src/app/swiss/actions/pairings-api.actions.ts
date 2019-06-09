import { Action } from '@ngrx/store';
import { Pairing } from 'app/shared';

export enum PairingsApiActionTypes {
  CreatePairingsSuccess = '[Pairings/API] Create Pairings Success',
  LoadPairings = '[Pairings/API] Load Pairings',
  LoadPairingsFailure = '[Pairings/API] Load Pairings Failure',
  LoadPairingsSuccess = '[Pairings/API] Load Pairings Success'
}

export class CreatePairingsSuccess implements Action {
  readonly type = PairingsApiActionTypes.CreatePairingsSuccess;

  constructor(public payload: {round: number, pairings: Pairing[]}) {}
}

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
  CreatePairingsSuccess
  | LoadPairings
  | LoadPairingsFailure
  | LoadPairingsSuccess;
