import { Action, createAction, props } from '@ngrx/store';
import { Player } from 'app/shared';

export enum PlayerPageActionTypes {
  AddPlayer = '[Players Page] Add Player',
  DeletePlayer = '[Players Page] Delete Player',
  DropPlayer = '[Players Page] Drop Player',
  UpdatePlayer = '[Players Page] Update Player'
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

export const beginEvent = createAction(
  '[Players Page] Begin Event',
  props<{numberOfRounds: number}>()
);

export class AddPlayer implements Action {
  readonly type = PlayerPageActionTypes.AddPlayer;

  constructor(public payload: Player) {
    this.payload = Object.assign({}, defaults, payload);
  }
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

export class UpdatePlayer implements Action {
  readonly type = PlayerPageActionTypes.UpdatePlayer;

  constructor(public payload: {player: Player, changes: any}) {}
}

export type PlayersPageActionsUnion = AddPlayer | DeletePlayer | DropPlayer | UpdatePlayer;
