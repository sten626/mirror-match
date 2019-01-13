import { Action } from '@ngrx/store';

import { Player } from 'app/shared';

export enum PlayerPageActionTypes {
  AddPlayer = '[Players Page] Add Player'
}

export class AddPlayer implements Action {
  readonly type = PlayerPageActionTypes.AddPlayer;

  constructor(public payload: Player) { }
}

export type PlayersPageActionsUnion = AddPlayer;
