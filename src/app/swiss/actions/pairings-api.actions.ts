import { Action } from '@ngrx/store';
import { Pairing } from 'app/shared';

export enum PairingsApiActionTypes {
  AddPairingsFailure = '[Pairings/API] Add Pairings Failure',
  AddPairingsSuccess = '[Pairings/API] Add Pairings Success',
  CreatePairingsSuccess = '[Pairings/API] Create Pairings Success',
  LoadPairings = '[Pairings/API] Load Pairings',
  LoadPairingsFailure = '[Pairings/API] Load Pairings Failure',
  LoadPairingsSuccess = '[Pairings/API] Load Pairings Success'
}

export class AddPairingsFailure implements Action {
  readonly type = PairingsApiActionTypes.AddPairingsFailure;

  constructor(public payload: any) {}
}

export class AddPairingsSuccess implements Action {
  readonly type = PairingsApiActionTypes.AddPairingsSuccess;

  constructor(public payload: Pairing[]) {}
}

export class CreatePairingsSuccess implements Action {
  readonly type = PairingsApiActionTypes.CreatePairingsSuccess;

  constructor(public payload: {roundId: number, pairings: Pairing[]}) {}
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
  AddPairingsFailure
  | AddPairingsSuccess
  | CreatePairingsSuccess
  | LoadPairings
  | LoadPairingsFailure
  | LoadPairingsSuccess;
