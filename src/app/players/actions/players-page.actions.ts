import { Player } from '@mm/shared/models';
import { createAction, props } from '@ngrx/store';

// export const addPlayer = createAction(
//   '[Setup Page] Add Player',
//   props<{ player: Player }>()
// );

export const clearPlayers = createAction('[Players Page] Clear Players');

export const deletePlayer = createAction(
  '[Players Page] Delete Player',
  props<{ id: number }>()
);

// export const updatePlayer = createAction(
//   '[Setup Page] Update Player',
//   props<{ update: Update<Player> }>()
// );

export const upsertPlayer = createAction(
  '[Players Page] Upsert Player',
  props<{ player: Player }>()
);
