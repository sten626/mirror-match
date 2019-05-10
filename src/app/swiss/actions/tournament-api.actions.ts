import { Action } from '@ngrx/store';

export enum TournamentApiActionTypes {
  BeginEventFailure = '[Tournament/API] Begin Event Failure',
  BeginEventSuccess = '[Tournament/API] Begin Event Success',
  LoadTournamentSuccess = '[Tournament/API] Load Tournament Success'
}

export class BeginEventFailure implements Action {
  readonly type = TournamentApiActionTypes.BeginEventFailure;
}

export class BeginEventSuccess implements Action {
  readonly type = TournamentApiActionTypes.BeginEventSuccess;

  constructor(public payload: number) {}
}

export class LoadTournamentSuccess implements Action {
  readonly type = TournamentApiActionTypes.LoadTournamentSuccess;

  constructor(public payload: any) {}
}

export type TournamentApiActionsUnion = BeginEventFailure | BeginEventSuccess | LoadTournamentSuccess;
