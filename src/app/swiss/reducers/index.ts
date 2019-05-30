import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { Player } from 'app/shared';
import * as fromPlayers from './players.reducer';
import * as fromTournament from './tournament.reducer';

export interface SwissState {
  players: fromPlayers.State;
  tournament: fromTournament.State;
}

export interface State extends fromRoot.State {
  swiss: SwissState;
}

export const reducers: ActionReducerMap<SwissState> = {
  players: fromPlayers.reducer,
  tournament: fromTournament.reducer
};

export const getSwissState = createFeatureSelector<State, SwissState>('swiss');

export const getPlayersState = createSelector(
  getSwissState,
  state => state.players
);

export const getTournamentState = createSelector(
  getSwissState,
  state => state.tournament
);

export const arePlayersLoaded = createSelector(
  getPlayersState,
  fromPlayers.arePlayersLoaded
);

export const getAllPlayers = createSelector(
  getPlayersState,
  fromPlayers.selectAllPlayers
);

export const getActivePlayers = createSelector(
  getAllPlayers,
  (players) => players.filter((player) => !player.dropped)
);

export const getDroppedPlayers = createSelector(
  getAllPlayers,
  (players) => players.filter((player) => player.dropped)
);

export const getNumberOfDroppedPlayers = createSelector(
  getDroppedPlayers,
  (players) => players.length
);

export const hasTournamentStarted = createSelector(
  getTournamentState,
  fromTournament.hasTournamentStarted
);

export const isTournamentLoaded = createSelector(
  getTournamentState,
  fromTournament.isTournamentLoaded
);

export const isTournamentOver = createSelector(
  getTournamentState,
  fromTournament.isTournamentOver
);

export const getCurrentRound = createSelector(
  getTournamentState,
  fromTournament.getCurrentRound
);

export const getNumberOfPlayers = createSelector(
  getPlayersState,
  fromPlayers.selectPlayerTotal
);

export const getNumberOfActivePlayers = createSelector(
  getActivePlayers,
  (activePlayers: Player[]) => {
    return activePlayers.length;
  }
);

export const getNumberOfRounds = createSelector(
  getTournamentState,
  fromTournament.getNumberOfRounds
);
