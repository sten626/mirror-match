import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Player } from 'app/shared';

export const addPlayerSuccess = createAction(
  '[Players/API] Add Player Success',
  props<{player: Player}>()
);

export const deletePlayerSuccess = createAction(
  '[Players/API] Delete Player Success',
  props<{playerId: number}>()
);

export const dropPlayersSuccess = createAction(
  '[Players/API] Drop Players Success',
  props<{players: Update<Player>[]}>()
);

export const loadPlayers = createAction(
  '[Players/API] Load Players'
);

export const loadPlayersSuccess = createAction(
  '[Players/API] Load Players Success',
  props<{players: Player[]}>()
);

export const updatePlayer = createAction(
  '[Players/API] Update Player',
  props<{player: Update<Player>}>()
);
