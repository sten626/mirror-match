import { Pod } from '@app/core/services/draft-pod.service';
import { TournamentInfo } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

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
  props<{ tournamentInfo: TournamentInfo }>()
);

export const startDraft = createAction(
  '[Tournament/API] Start Draft',
  props<{ playerIds: number[] }>()
);

export const startDraftFailure = createAction(
  '[Tournament/API] Start Draft Failure',
  props<{ err: any }>()
);

export const startDraftSuccess = createAction(
  '[Tournament/API] Start Draft Success',
  props<{ pods: Pod[] }>()
);

// export const startTournamentFailure = createAction(
//   '[Tournament/API] Start Tournament Failure',
//   props<{ err: any }>()
// );

// export const startTournamentSuccess = createAction(
//   '[Tournament/API] Start Tournament Success',
//   props<{ tournamentInfo }>()
// );
