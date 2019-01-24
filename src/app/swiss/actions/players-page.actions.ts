import { Action } from '@ngrx/store';

import { Player } from 'app/shared';

export enum PlayerPageActionTypes {
  AddPlayer = '[Players Page] Add Player'
}

export class AddPlayer implements Action {
  readonly type = PlayerPageActionTypes.AddPlayer;

  constructor(public payload: Player) {
    const defaults = {
      matchesPlayed: 0,
      matchesWon: 0,
      matchesDrawn: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesDrawn: 0,
      byes: 0,
      opponentIds: new Set(),
      dropped: false
    };

    this.payload = Object.assign({}, defaults, payload);
  }
}

export type PlayersPageActionsUnion = AddPlayer;
