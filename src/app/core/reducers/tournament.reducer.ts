import { TournamentApiActions } from '@app/core/actions';
import { Action, createReducer, on } from '@ngrx/store';

export const tournamentFeatureKey = 'tournament';

export interface State {
  bestOf: number;
  isDraft: boolean;
  totalRounds: number;
}

export const initialState: State = {
  bestOf: 0,
  isDraft: true,
  totalRounds: 0
};

const tournamentReducer = createReducer(
  initialState,
  on(TournamentApiActions.startTournamentSuccess, (state, {bestOf, isDraft, totalRounds}) => ({
    ...state,
    bestOf,
    isDraft,
    totalRounds
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return tournamentReducer(state, action);
}
