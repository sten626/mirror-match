import { Action } from '@ngrx/store';

import { Player } from 'app/shared';

export enum PlayerPageActionTypes {
  AddPlayer = '[Players Page] Add Player',
  LoadPlayers = '[Players Page] Load Players',
  SelectPlayer = '[Players Page] Select Player',
  UpdatePlayer = '[Players Page] Update Player'
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

export class LoadPlayers implements Action {
  readonly type = PlayerPageActionTypes.LoadPlayers;
}

export class SelectPlayer implements Action {
  readonly type = PlayerPageActionTypes.SelectPlayer;

  constructor(public payload: string) {}
}

export class UpdatePlayer implements Action {
  readonly type = PlayerPageActionTypes.UpdatePlayer;

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

export type PlayersPageActionsUnion = AddPlayer | LoadPlayers | SelectPlayer | UpdatePlayer;
