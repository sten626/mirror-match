import { Player, TournamentInfo } from '@app/shared/models';
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

// export const startDraft = createAction(
//   '[Setup Page] Start Draft'
// );

export const startTournament = createAction(
  '[Setup Page] Start Tournament',
  props<{ activePlayerIds: number[]; tournamentInfo: TournamentInfo }>()
);

export const updatePlayer = createAction(
  '[Setup Page] Update Player',
  props<{ player: Update<Player> }>()
);
