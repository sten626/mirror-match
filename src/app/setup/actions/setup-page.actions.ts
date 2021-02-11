import { Player } from '@mm/shared/models';
import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction(
  '[Setup Page] Add Player',
  props<{ player: Player }>()
);

export const clearPlayers = createAction('[Setup Page] Clear Players');
