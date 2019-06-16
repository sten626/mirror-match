import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Round } from 'app/shared';

export const addRound = createAction(
  '[Round/API] Add Round',
  props<{round: Round}>()
);

export const beginEventSuccess = createAction(
  '[Round/API] Begin Event Success',
  props<{numberOfRounds: number}>()
);

export const loadRounds = createAction(
  '[Round/API] Load Rounds'
);

export const loadRoundsSuccess = createAction(
  '[Round/API] Load Rounds Success',
  props<{
    numberOfRounds: number,
    rounds: Round[],
    selectedRoundId: number
  }>()
);

export const roundCompleted = createAction(
  '[Round/API] Round Completed',
  props<{roundId: number}>()
);

export const setSelectedRound = createAction(
  '[Round/API] Set SelectedRound',
  props<{roundId: number}>()
);

export const updateRound = createAction(
  '[Round/API] Update Round',
  props<{round: Update<Round>}>()
);
