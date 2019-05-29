import { Action } from '@ngrx/store';
import { Player } from 'app/shared';
import { Update } from '@ngrx/entity';

export enum PlayersApiActionTypes {
  AddPlayerFailure = '[Players/API] Add Player Failure',
  AddPlayerSuccess = '[Players/API] Add Player Success',
  DeletePlayerFailure = '[Players/API] Delete Player Failure',
  DeletePlayerSuccess = '[Players/API] Delete Player Success',
  DropPlayerFailure = '[Players/API] Drop Player Failure',
  DropPlayerSuccess = '[Players/API] Drop Player Success',
  LoadPlayers = '[Players/API] Load Players',
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

export class DeletePlayerFailure implements Action {
  readonly type = PlayersApiActionTypes.DeletePlayerFailure;

  constructor(public payload: Player) {}
}

export class DeletePlayerSuccess implements Action {
  readonly type = PlayersApiActionTypes.DeletePlayerSuccess;

  constructor(public payload: Player) {}
}

export class DropPlayerFailure implements Action {
  readonly type = PlayersApiActionTypes.DropPlayerFailure;

  constructor(public payload: any) {}
}

export class DropPlayerSuccess implements Action {
  readonly type = PlayersApiActionTypes.DropPlayerSuccess;

  constructor(public payload: Update<Player>) {}
}

export class LoadPlayers implements Action {
  readonly type = PlayersApiActionTypes.LoadPlayers;
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

  constructor(public payload: Player) {}
}

export class UpdatePlayerNameSuccess implements Action {
  readonly type = PlayersApiActionTypes.UpdatePlayerNameSuccess;

  constructor(public payload: Update<Player>) {}
}

export type PlayersApiActionsUnion =
  AddPlayerFailure
  | AddPlayerSuccess
  | DeletePlayerFailure
  | DeletePlayerSuccess
  | DropPlayerFailure
  | DropPlayerSuccess
  | LoadPlayers
  | LoadPlayersFailure
  | LoadPlayersSuccess
  | UpdatePlayerNameFailure
  | UpdatePlayerNameSuccess;
