import { Action } from '@ngrx/store';
import { Player } from 'app/shared';

export enum PlayersApiActionTypes {
  AddPlayerFailure = '[Players/API] Add Player Failure',
  AddPlayerSuccess = '[Players/API] Add Player Success',
  LoadPlayersFailure = '[Players/API] Load Players Failure',
  LoadPlayersSuccess = '[Players/API] Load Players Success',
  UpdatePlayerNameFailure = '[Players/API] Update Player Name Failure',
  UpdatePlayerNameSuccess = '[Players/API] Update Player Name Success'
}

export class AddPlayerFailure implements Action {
  readonly type = PlayersApiActionTypes.AddPlayerFailure;

  constructor(public payload: Player) {}
}

export class AddPlayerSuccess implements Action {
  readonly type = PlayersApiActionTypes.AddPlayerSuccess;

  constructor(public payload: Player) {}
}

export class LoadPlayersFailure implements Action {
  readonly type = PlayersApiActionTypes.LoadPlayersFailure;

  constructor(public payload: any) {}
}

export class LoadPlayersSuccess implements Action {
  readonly type = PlayersApiActionTypes.LoadPlayersSuccess;

  constructor(public payload: Player[]) {}
}

export class UpdatePlayerNameFailure implements Action {
  readonly type = PlayersApiActionTypes.UpdatePlayerNameFailure;

  constructor(public payload: any) {}
}

export class UpdatePlayerNameSuccess implements Action {
  readonly type = PlayersApiActionTypes.UpdatePlayerNameSuccess;

  constructor(public payload: Player) {}
}

export type PlayersApiActionsUnion =
  AddPlayerFailure
  | AddPlayerSuccess
  | LoadPlayersFailure
  | LoadPlayersSuccess
  | UpdatePlayerNameFailure
  | UpdatePlayerNameSuccess;
