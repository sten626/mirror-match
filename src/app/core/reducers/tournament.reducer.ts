import { TournamentApiActions } from '@app/core/actions';
import { Pod } from '@app/core/services/draft-pod.service';
import { Action, createReducer, on } from '@ngrx/store';

export const tournamentFeatureKey = 'tournament';

export interface State {
  bestOf: number;
  isDraft: boolean;
  totalRounds: number;
  pods: Pod[];
}

export const initialState: State = {
  bestOf: 0,
  isDraft: true,
  totalRounds: 0,
  pods: []
};

const tournamentReducer = createReducer(
  initialState,
  on(TournamentApiActions.startDraftSuccess, (state, {pods}) => ({
    ...state,
    pods
  })),
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
