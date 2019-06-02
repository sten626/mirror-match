import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { Player } from 'app/shared';
import * as fromPlayers from './players.reducer';
import * as fromRounds from './rounds.reducer';
import * as fromTournament from './tournament.reducer';

export interface SwissState {
  players: fromPlayers.State;
  rounds: fromRounds.State;
  tournament: fromTournament.State;
}

export interface State extends fromRoot.State {
  swiss: SwissState;
}

export const reducers: ActionReducerMap<SwissState> = {
  players: fromPlayers.reducer,
  rounds: fromRounds.reducer,
  tournament: fromTournament.reducer
};

export const getSwissState = createFeatureSelector<State, SwissState>('swiss');

export const getPlayersState = createSelector(
  getSwissState,
  state => state.players
);

export const getRoundsState = createSelector(
  getSwissState,
  state => state.rounds
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
  getRoundsState,
  fromRounds.hasTournamentStarted
);

export const isTournamentLoaded = createSelector(
  getTournamentState,
  fromTournament.isTournamentLoaded
);

export const isTournamentOver = createSelector(
  getRoundsState,
  fromRounds.isTournamentOver
);

export const getCurrentRound = createSelector(
  getRoundsState,
  fromRounds.getCurrentRound
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
  getRoundsState,
  fromRounds.getNumberOfRounds
);

export const getRoundIds = createSelector(
  getRoundsState,
  fromRounds.getRoundIds
);

export const getSelectedRound = createSelector(
  getTournamentState,
  fromTournament.getSelectedRound
);
