import { Player } from '@app/shared/models';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const updatePlayer = createAction(
  '[Setup Page] Update Player',
  props<{player: Update<Player>}>()
);




