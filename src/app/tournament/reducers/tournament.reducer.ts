import { TournamentApiActions } from '@app/tournament/actions';
import { Action, createReducer, on } from '@ngrx/store';

export const tournamentFeatureKey = 'tournament';

export interface State {
  bestOf: number;
  hasDraftStarted: boolean;
  hasSwissStarted: boolean;
  isDraft: boolean;
  totalRounds: number;
}

export const initialState: State = {
  bestOf: 0,
  hasDraftStarted: false,
  hasSwissStarted: false,
  isDraft: true,
  totalRounds: 0
};

const tournamentReducer = createReducer(
  initialState,
  on(
    TournamentApiActions.loadTournamentSuccess,
    TournamentApiActions.setTournamentInfoSuccess,
    (state, { tournamentInfo }) => ({
      ...state,
      ...tournamentInfo
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return tournamentReducer(state, action);
}

export const hasDraftStarted = (state: State) => state.hasDraftStarted;
export const hasSwissStarted = (state: State) => state.hasSwissStarted;
export const isDraft = (state: State) => state.isDraft;
