import { Player } from '@mm/shared/models';
import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction(
  '[Players Page] Add Player',
  props<{player: Player}>()
);

export const beginEvent = createAction(
  '[Players Page] Begin Event',
  props<{numberOfRounds: number}>()
);

export const deletePlayer = createAction(
  '[Players Page] Delete Player',
  props<{playerId: number}>()
);

export const togglePlayerDropped = createAction(
  '[Players Page] Toggle Players Dropped',
  props<{player: Player}>()
);

export const updatePlayerName = createAction(
  '[Players Page] Update Player Name',
  props<{player: Player, name: string}>()
);
