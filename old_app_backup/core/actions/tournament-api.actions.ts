import { TournamentInfo } from '@mm/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadTournament = createAction('[Tournament/API] Load Tournament');

export const loadTournamentSuccess = createAction(
  '[Tournament/API] Load Tournament Success',
  props<{ tournamentInfo: TournamentInfo }>()
);

export const loadTournamentFailure = createAction(
  '[Tournament/API] Load Tournament Failure',
  props<{ error: any }>()
);

export const setTournamentInfoSuccess = createAction(
  '[Tournament/API] Set Tournament Info Success',
  props<{ tournamentInfo: TournamentInfo }>()
);

export const setTournamentInfoFailure = createAction(
  '[Tournament/API] Set Tournament Info Failure',
  props<{ error: any }>()
);