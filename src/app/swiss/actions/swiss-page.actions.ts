import { Action } from '@ngrx/store';

export enum SwissPageActionTypes {
  LoadPlayers = '[Swiss Page] Load Players',
  LoadTournament = '[Swiss Page] Load Tournament'
}

export class LoadPlayers implements Action {
  readonly type = SwissPageActionTypes.LoadPlayers;
}

export class LoadTournament implements Action {
  readonly type = SwissPageActionTypes.LoadTournament;
}

export type SwissPageActionsUnion = LoadPlayers | LoadTournament;
