import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPlayers from './players.reducer';
import * as fromTournament from './tournament.reducer';

export interface SwissState {
  players: fromPlayers.State;
  tournament: fromTournament.State;
}

export interface State {
  swiss: SwissState;
}

export const reducers: ActionReducerMap<SwissState> = {
  players: fromPlayers.reducer,
  tournament: fromTournament.reducer
};

export const selectPlayersState = createFeatureSelector<fromPlayers.State>('players');
export const selectTournamentState = createFeatureSelector<fromTournament.State>('tournament');

export const selectAllPlayers = createSelector(
  selectPlayersState,
  fromPlayers.selectAllPlayers
);

export const selectHasTournamentStarted = createSelector(
  selectTournamentState,
  fromTournament.selectHasTournamentStarted
);

export const selectIsTournamentOver = createSelector(
  selectTournamentState,
  fromTournament.selectIsTournamentOver
);

export const selectNumRounds = createSelector(
  selectTournamentState,
  fromTournament.selectNumRounds
);

export const selectPlayerTotal = createSelector(
  selectPlayersState,
  fromPlayers.selectPlayerTotal
);
