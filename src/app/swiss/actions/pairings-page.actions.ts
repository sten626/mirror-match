import { Action } from '@ngrx/store';

export enum PairingsPageActionTypes {
  LoadPlayers = '[Pairings Page] Load Players',
  LoadTournament = '[Pairings Page] Load Tournament'
}

export class LoadPlayers implements Action {
  readonly type = PairingsPageActionTypes.LoadPlayers;
}

export class LoadTournament implements Action {
  readonly type = PairingsPageActionTypes.LoadTournament;
}

export type PairingsPageActionsUnion = LoadPlayers | LoadTournament;
