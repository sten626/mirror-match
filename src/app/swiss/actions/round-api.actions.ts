import { Action } from '@ngrx/store';
import { Round } from 'app/shared';
import { Update } from '@ngrx/entity';

export enum RoundApiActionTypes {
  BeginEventFailure = '[Round/API] Begin Event Failure',
  BeginEventSuccess = '[Round/API] Begin Event Success',
  CreatePairingsFailure = '[Round/API] Create Pairings Failure',
  CreatePairingsSuccess = '[Round/API] Create Pairings Success',
  CreateRoundFailure = '[Round/API] Create Round Failure',
  CreateRoundSuccess = '[Round/API] Create Round Success',
  LoadRounds = '[Round/API] Load Rounds',
  LoadRoundsFailure = '[Round/API] Load Rounds Failure',
  LoadRoundsSuccess = '[Round/API] Load Founds Success',
  SelectRoundFailure = '[Round/API] Select Round Failure',
  SelectRoundSuccess = '[Round/API] Select Round Success',
  UpdateRoundFailure = '[Round/API] Update Round Failure',
  UpdateRoundSuccess = '[Round/API] Update Round Success'
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

export class LoadRounds implements Action {
  readonly type = RoundApiActionTypes.LoadRounds;
}

export class LoadRoundsFailure implements Action {
  readonly type = RoundApiActionTypes.LoadRoundsFailure;

  constructor(public payload: any) {}
}

export class LoadRoundsSuccess implements Action {
  readonly type = RoundApiActionTypes.LoadRoundsSuccess;

  constructor(public payload: {
    rounds: Round[],
    numberOfRounds: number,
    selectedRoundId: number
  }) {}
}

export class SelectRoundFailure implements Action {
  readonly type = RoundApiActionTypes.SelectRoundFailure;

  constructor(public payload: any) {}
}

export class SelectRoundSuccess implements Action {
  readonly type = RoundApiActionTypes.SelectRoundSuccess;

  constructor(public payload: number) {}
}

export class UpdateRoundFailure implements Action {
  readonly type = RoundApiActionTypes.UpdateRoundFailure;

  constructor(public payload: any) {}
}

export class UpdateRoundSuccess implements Action {
  readonly type = RoundApiActionTypes.UpdateRoundSuccess;

  constructor(public payload: Update<Round>) {}
}

export type RoundApiActionsUnion =
  BeginEventFailure
  | BeginEventSuccess
  | CreatePairingsFailure
  | CreatePairingsSuccess
  | CreateRoundFailure
  | CreateRoundSuccess
  | LoadRounds
  | LoadRoundsFailure
  | LoadRoundsSuccess
  | SelectRoundFailure
  | SelectRoundSuccess
  | UpdateRoundFailure
  | UpdateRoundSuccess;
