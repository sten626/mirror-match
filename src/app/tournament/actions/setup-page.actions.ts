import { Player, TournamentInfo } from '@mm/shared/models';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction(
  '[Setup Page] Add Player',
  props<{ player: Player }>()
);

export const deletePlayer = createAction(
  '[Setup Page] Delete Player',
  props<{ id: number }>()
);

export const startTournament = createAction(
  '[Setup Page] Start Tournament',
  props<{ tournamentInfo: TournamentInfo }>()
);

export const updatePlayer = createAction(
  '[Setup Page] Update Player',
  props<{ player: Update<Player> }>()
);
