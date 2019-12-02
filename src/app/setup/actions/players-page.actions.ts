import { Player } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction(
  '[Players Page] Add Player',
  props<{player: Player}>()
);
