import { Action } from '@ngrx/store';
import { Player } from 'app/shared';

export enum PlayerPageActionTypes {
  AddPlayer = '[Players Page] Add Player',
  BeginEvent = '[Players Page] Begin Event',
  DeletePlayer = '[Players Page] Delete Player',
  DropPlayer = '[Players Page] Drop Player',
  UpdatePlayerName = '[Players Page] Update Player Name'
}

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

export class AddPlayer implements Action {
  readonly type = PlayerPageActionTypes.AddPlayer;

  constructor(public payload: Player) {
    this.payload = Object.assign({}, defaults, payload);
  }
}

export class BeginEvent implements Action {
  readonly type = PlayerPageActionTypes.BeginEvent;

  constructor(public payload: number) {}
}

export class DeletePlayer implements Action {
  readonly type = PlayerPageActionTypes.DeletePlayer;

  constructor(public payload: Player) {}
}

export class DropPlayer implements Action {
  readonly type = PlayerPageActionTypes.DropPlayer;
  payload: Player;

  constructor(public player: Player) {
    this.payload = Object.assign({}, player, { dropped: true });
  }
}

export class UpdatePlayerName implements Action {
  readonly type = PlayerPageActionTypes.UpdatePlayerName;
  payload: Player;

  constructor(player: Player, name: string) {
    this.payload = Object.assign({}, player, { name: name });
  }
}

export type PlayersPageActionsUnion = AddPlayer | BeginEvent | DeletePlayer | DropPlayer | UpdatePlayerName;
