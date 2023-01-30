import { Round } from '@mm/shared/models';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addRound = createAction(
  '[Round/API] Add Round',
  props<{ round: Round }>()
);

export const beginEventSuccess = createAction(
  '[Round/API] Begin Event Success',
  props<{ numberOfRounds: number }>()
);

export const loadRounds = createAction('[Round/API] Load Rounds');

export const loadRoundsSuccess = createAction(
  '[Round/API] Load Rounds Success',
  props<{
    completedRoundId: number;
    numberOfRounds: number;
    rounds: Round[];
    selectedRoundId: number;
  }>()
);

export const roundCompleted = createAction(
  '[Round/API] Round Completed',
  props<{ roundId: number }>()
);

export const setCompletedRoundSuccess = createAction(
  '[Round/API] Set Completed Round Success',
  props<{ roundId: number }>()
);

export const setSelectedRound = createAction(
  '[Round/API] Set Selected Round',
  props<{ roundId: number | null }>()
);

export const updateRound = createAction(
  '[Round/API] Update Round',
  props<{ round: Update<Round> }>()
);
