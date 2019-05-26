import { Action } from '@ngrx/store';
import { TournamentInfo } from 'app/shared';

export enum TournamentApiActionTypes {
  BeginEventFailure = '[Tournament/API] Begin Event Failure',
  BeginEventSuccess = '[Tournament/API] Begin Event Success',
  LoadTournamentFailure = '[Tournament/API] Load Tournament Failure',
  LoadTournamentSuccess = '[Tournament/API] Load Tournament Success'
}

export class BeginEventFailure implements Action {
  readonly type = TournamentApiActionTypes.BeginEventFailure;
}

export class BeginEventSuccess implements Action {
  readonly type = TournamentApiActionTypes.BeginEventSuccess;

  constructor(public payload: number) {}
}

export class LoadTournamentFailure implements Action {
  readonly type = TournamentApiActionTypes.LoadTournamentFailure;

  constructor(public payload: any) {}
}

export class LoadTournamentSuccess implements Action {
  readonly type = TournamentApiActionTypes.LoadTournamentSuccess;

  constructor(public payload: TournamentInfo) {}
}

export type TournamentApiActionsUnion = BeginEventFailure | BeginEventSuccess | LoadTournamentSuccess;
