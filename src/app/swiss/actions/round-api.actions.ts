import { Action } from '@ngrx/store';
import { Round } from 'app/shared';

export enum RoundApiActionTypes {
  BeginEventFailure = '[Round/API] Begin Event Failure',
  BeginEventSuccess = '[Round/API] Begin Event Success',
  CreatePairingsFailure = '[Round/API] Create Pairings Failure',
  CreatePairingsSuccess = '[Round/API] Create Pairings Success',
  CreateRoundFailure = '[Round/API] Create Round Failure',
  CreateRoundSuccess = '[Round/API] Create Round Success'
}

export class BeginEventFailure implements Action {
  readonly type = RoundApiActionTypes.BeginEventFailure;

  constructor(public payload: any) {}
}

export class BeginEventSuccess implements Action {
  readonly type = RoundApiActionTypes.BeginEventSuccess;

  constructor(public payload: number) {}
}

export class CreatePairingsFailure implements Action {
  readonly type = RoundApiActionTypes.CreatePairingsFailure;

  constructor(public payload: any) {}
}

export class CreatePairingsSuccess implements Action {
  readonly type = RoundApiActionTypes.CreatePairingsSuccess;

  constructor(public payload: Round) {}
}

export class CreateRoundFailure implements Action {
  readonly type = RoundApiActionTypes.CreateRoundFailure;

  constructor(public payload: any) {}
}

export class CreateRoundSuccess implements Action {
  readonly type = RoundApiActionTypes.CreateRoundSuccess;

  constructor(public payload: Round) {}
}

export type RoundApiActionsUnion =
  BeginEventFailure
  | BeginEventSuccess
  | CreatePairingsFailure
  | CreatePairingsSuccess
  | CreateRoundFailure
  | CreateRoundSuccess;
