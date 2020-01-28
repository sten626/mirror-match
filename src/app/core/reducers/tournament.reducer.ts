import { Action, createReducer } from '@ngrx/store';

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
  initialState
);

export function reducer(state: State | undefined, action: Action) {
  return tournamentReducer(state, action);
}
