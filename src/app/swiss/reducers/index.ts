import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPlayers from './players.reducer';
import * as fromTournament from './tournament.reducer';
import { Player } from '../../shared';

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

export const getPlayersState = createFeatureSelector<fromPlayers.State>('players');
export const getTournamentState = createFeatureSelector<fromTournament.State>('tournament');

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
  (players: Player[]) => {
    return players.filter((player: Player) => !player.dropped);
  }
);

export const hasTournamentStarted = createSelector(
  getTournamentState,
  fromTournament.hasTournamentStarted
);

export const isTournamentOver = createSelector(
  getTournamentState,
  fromTournament.isTournamentOver
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
