import { Action } from '@ngrx/store';
import { Round } from 'app/shared';

export enum RoundApiActionTypes {
  BeginEventFailure = '[Round/API] Begin Event Failure',
  BeginEventSuccess = '[Round/API] Begin Event Success',
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
  | CreateRoundFailure
  | CreateRoundSuccess;
