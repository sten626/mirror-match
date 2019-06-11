import { Action } from '@ngrx/store';
import { Pairing } from 'app/shared';

export enum PairingsApiActionTypes {
  CreatePairingsSuccess = '[Pairings/API] Create Pairings Success',
  DeletePairingsFailure = '[Pairings/API] Delete Pairings Failure',
  DeletePairingsSuccess = '[Pairings/API] Delete Pairings Success',
  LoadPairings = '[Pairings/API] Load Pairings',
  LoadPairingsFailure = '[Pairings/API] Load Pairings Failure',
  LoadPairingsSuccess = '[Pairings/API] Load Pairings Success'
}

export class CreatePairingsSuccess implements Action {
  readonly type = PairingsApiActionTypes.CreatePairingsSuccess;

  constructor(public payload: {roundId: number, pairings: Pairing[]}) {}
}

export class DeletePairingsFailure implements Action {
  readonly type = PairingsApiActionTypes.DeletePairingsFailure;

  constructor(public payload: any) {}
}

export class DeletePairingsSuccess implements Action {
  readonly type = PairingsApiActionTypes.DeletePairingsSuccess;

  constructor(public payload: number[]) {}
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
  | DeletePairingsFailure
  | DeletePairingsSuccess
  | LoadPairings
  | LoadPairingsFailure
  | LoadPairingsSuccess;
