import { Player } from '@mm/shared/models';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction(
  '[Setup Page] Add Player',
  props<{ player: Player }>()
);

export const clearPlayers = createAction('[Setup Page] Clear Players');

export const deletePlayer = createAction(
  '[Setup Page] Delete Player',
  props<{ id: number }>()
);

export const updatePlayer = createAction(
  '[Setup Page] Update Player',
  props<{ update: Update<Player> }>()
);
