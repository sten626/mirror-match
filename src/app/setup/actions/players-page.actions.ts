import { Player } from '@app/shared/models';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction(
  '[Players Page] Add Player',
  props<{player: Player}>()
);

export const updatePlayer = createAction(
  '[Players Page] Update Player',
  props<{player: Update<Player>}>()
);
