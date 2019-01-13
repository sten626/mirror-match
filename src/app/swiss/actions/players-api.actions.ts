import { Action } from '@ngrx/store';
import { Player } from 'app/shared';

export enum PlayersApiActionTypes {
  AddPlayerFailure = '[Players/API] Add Player Failure',
  AddPlayerSuccess = '[Players/API] Add Player Success'
}

export class AddPlayerFailure implements Action {
  readonly type = PlayersApiActionTypes.AddPlayerFailure;

  constructor(public payload: Player) {}
}

export class AddPlayerSuccess implements Action {
  readonly type = PlayersApiActionTypes.AddPlayerSuccess;

  constructor(public payload: Player) {}
}

export type PlayersApiActionsUnion = AddPlayerFailure | AddPlayerSuccess;
