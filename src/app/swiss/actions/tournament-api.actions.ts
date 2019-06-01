import { Action } from '@ngrx/store';
import { TournamentInfo } from 'app/shared';

export enum TournamentApiActionTypes {
  BeginEventFailure = '[Tournament/API] Begin Event Failure',
  BeginEventSuccess = '[Tournament/API] Begin Event Success',
  LoadTournament = '[Tournament/API] Load Tournament',
  LoadTournamentFailure = '[Tournament/API] Load Tournament Failure',
  LoadTournamentSuccess = '[Tournament/API] Load Tournament Success',
  SetSelectedRoundFailure = '[Tournament/API] Set Selected Round Failure',
  SetSelectedRoundSuccess = '[Tournament/API] Set Selected Round Success'
}

export class BeginEventFailure implements Action {
  readonly type = TournamentApiActionTypes.BeginEventFailure;
}

export class BeginEventSuccess implements Action {
  readonly type = TournamentApiActionTypes.BeginEventSuccess;

  constructor(public payload: number) {}
}

export class LoadTournament implements Action {
  readonly type = TournamentApiActionTypes.LoadTournament;
}

export class LoadTournamentFailure implements Action {
  readonly type = TournamentApiActionTypes.LoadTournamentFailure;

  constructor(public payload: any) {}
}

export class LoadTournamentSuccess implements Action {
  readonly type = TournamentApiActionTypes.LoadTournamentSuccess;

  constructor(public payload: TournamentInfo) {}
}

export class SetSelectedRoundFailure implements Action {
  readonly type = TournamentApiActionTypes.SetSelectedRoundFailure;

  constructor(public payload: any) {}
}

export class SetSelectedRoundSuccess implements Action {
  readonly type = TournamentApiActionTypes.SetSelectedRoundSuccess;

  constructor(public payload: number) {}
}

export type TournamentApiActionsUnion =
  BeginEventFailure
  | BeginEventSuccess
  | LoadTournament
  | LoadTournamentFailure
  | LoadTournamentSuccess
  | SetSelectedRoundFailure
  | SetSelectedRoundSuccess;
