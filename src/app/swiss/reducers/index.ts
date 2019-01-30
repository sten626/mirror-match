import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPlayers from './players.reducer';

export interface State {
  players: fromPlayers.State;
}

export const reducers: ActionReducerMap<State> = {
  players: fromPlayers.reducer
};

export const selectPlayersState = createFeatureSelector<fromPlayers.State>('players');

export const selectAllPlayers = createSelector(
  selectPlayersState,
  fromPlayers.selectAllPlayers
);

export const getSelectedPlayer = createSelector(
  selectPlayersState,
  fromPlayers.getSelectedPlayer
);
