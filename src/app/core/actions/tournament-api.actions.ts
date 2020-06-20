import { TournamentInfo } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

export const createDraftPods = createAction(
  '[Tournament/API] Create Draft Pods',
  props<{ activePlayerIds: number[] }>()
);

export const loadTournament = createAction('[Tournament/API] Load Tournament');

export const loadTournamentFailure = createAction(
  '[Tournament/API] Load Tournament Failure',
  props<{ err: any }>()
);

export const loadTournamentSuccess = createAction(
  '[Tournament/API] Load Tournament Success',
  props<{ tournamentInfo: TournamentInfo }>()
);

export const setTournamentInfoFailure = createAction(
  '[Tournament/API] Set Tournament Info Failure',
  props<{ err: any }>()
);

export const setTournamentInfoSuccess = createAction(
  '[Tournament/API] Set Tournament Info Success',
  props<{ activePlayerIds: number[]; tournamentInfo: TournamentInfo }>()
);
