import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Pairing, Round } from 'app/shared';

export enum RoundApiActionTypes {
  AddPairingsFailure = '[Round/API] Add Pairings Failure',
  AddPairingsSuccess = '[Round/API] Add Pairings Success',
  BeginEventFailure = '[Round/API] Begin Event Failure',
  BeginEventSuccess = '[Round/API] Begin Event Success',
  CreateRoundFailure = '[Round/API] Create Round Failure',
  CreateRoundSuccess = '[Round/API] Create Round Success',
  LoadRounds = '[Round/API] Load Rounds',
  LoadRoundsFailure = '[Round/API] Load Rounds Failure',
  LoadRoundsSuccess = '[Round/API] Load Founds Success',
  RedoMatchesFailure = '[Round/API] Redo Matches Failure',
  RedoMatchesSuccess = '[Round/API] Redo Matches Success',
  SelectRoundFailure = '[Round/API] Select Round Failure',
  SelectRoundSuccess = '[Round/API] Select Round Success',
  UpdateRoundFailure = '[Round/API] Update Round Failure',
  UpdateRoundSuccess = '[Round/API] Update Round Success'
}

export class AddPairingsFailure implements Action {
  readonly type = RoundApiActionTypes.AddPairingsFailure;

  constructor(public payload: any) {}
}

export class AddPairingsSuccess implements Action {
  readonly type = RoundApiActionTypes.AddPairingsSuccess;

  constructor(public payload: {roundId: number, pairings: Pairing[]}) {}
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

export class RedoMatchesFailure implements Action {
  readonly type = RoundApiActionTypes.RedoMatchesFailure;

  constructor(public payload: any) {}
}

export class RedoMatchesSuccess implements Action {
  readonly type = RoundApiActionTypes.RedoMatchesSuccess;

  constructor(public payload: {roundId: number, pairingIds: number[]}) {}
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
  AddPairingsFailure
  | AddPairingsSuccess
  | BeginEventFailure
  | BeginEventSuccess
  | CreateRoundFailure
  | CreateRoundSuccess
  | LoadRounds
  | LoadRoundsFailure
  | LoadRoundsSuccess
  | RedoMatchesFailure
  | RedoMatchesSuccess
  | SelectRoundFailure
  | SelectRoundSuccess
  | UpdateRoundFailure
  | UpdateRoundSuccess;
