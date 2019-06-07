import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { Pairing, Player, Round } from 'app/shared';
import * as fromPlayers from './players.reducer';
import * as fromRounds from './rounds.reducer';
import * as fromTournament from './tournament.reducer';
import { Dictionary } from '@ngrx/entity';

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

/**
 * Module feature selector.
 */

export const getSwissState = createFeatureSelector<State, SwissState>('swiss');

/**
 * Player selectors.
 */

export const getPlayersState = createSelector(
  getSwissState,
  state => state.players
);

export const {
  selectIds: getPlayerIds,
  selectEntities: getPlayerEntities,
  selectAll: getAllPlayers,
  selectTotal: getTotalPlayers
} = fromPlayers.adapter.getSelectors(getPlayersState);

export const canBeginTournament = createSelector(
  getTotalPlayers,
  (totalPlayers: number) => totalPlayers >= 4
);

export const getActivePlayers = createSelector(
  getAllPlayers,
  (players) => players.filter((player) => !player.dropped)
);

export const getDroppedPlayers = createSelector(
  getAllPlayers,
  (players) => players.filter((player) => player.dropped)
);

export const getRecommendedNumberOfRounds = createSelector(
  getTotalPlayers,
  (totalPlayers: number) => Math.max(3, Math.ceil(Math.log2(totalPlayers)))
);

export const getTotalActivePlayers = createSelector(
  getActivePlayers,
  (activePlayers: Player[]) => {
    return activePlayers.length;
  }
);

export const getTotalDroppedPlayers = createSelector(
  getDroppedPlayers,
  (players) => players.length
);

/**
 * Round selectors
 */

export const getRoundsState = createSelector(
  getSwissState,
  state => state.rounds
);

export const getCompletedRoundId = createSelector(
  getRoundsState,
  fromRounds.getCompletedRoundId
);

export const getNumberOfRounds = createSelector(
  getRoundsState,
  fromRounds.getNumberOfRounds
);

export const getPairingsFilterText = createSelector(
  getRoundsState,
  fromRounds.getPairingsFilterText
);

export const getSelectedPairingId = createSelector(
  getRoundsState,
  fromRounds.getSelectedPairingId
);

export const getSelectedRoundId = createSelector(
  getRoundsState,
  fromRounds.getSelectedRoundId
);

export const getShowOutstandingOnly = createSelector(
  getRoundsState,
  fromRounds.getShowOutstandingOnly
);

export const {
  selectIds: getRoundIds,
  selectEntities: getRoundEntities,
  selectAll: getAllRounds,
  selectTotal: getTotalRounds
} = fromRounds.adapter.getSelectors(getRoundsState);

export const getSelectedRound = createSelector(
  getRoundEntities,
  getSelectedRoundId,
  (roundEntities, selectedRoundId) => selectedRoundId && roundEntities[selectedRoundId]
);

export const getSelectedRoundPairings = createSelector(
  getSelectedRound,
  (round: Round) => round.pairings
);

export const getSelectedRoundComplete = createSelector(
  getSelectedRoundPairings,
  (pairings: Pairing[]) => pairings.map(pairing => pairing.submitted).reduce((prev, cur) => prev && cur)
);

export const getSelectedRoundPairingsSubmitted = createSelector(
  getSelectedRoundPairings,
  (pairings: Pairing[]) => pairings.filter(pairing => pairing.submitted)
);

export const getSelectedRoundPairingsFiltered = createSelector(
  getSelectedRoundPairings,
  getPlayerEntities,
  getPairingsFilterText,
  getShowOutstandingOnly,
  (pairings: Pairing[], playerEntities: Dictionary<Player>, filterText: string, showOutstandingOnly: boolean) =>
    pairings.filter(pairing => {
      if (showOutstandingOnly && pairing.submitted) {
        return false;
      }

      if (!filterText) {
        return true;
      }

      if (filterText === pairing.table.toString()) {
        return true;
      }

      const player1Name = playerEntities[pairing.player1Id].name;

      if (player1Name.toLowerCase().includes(filterText)) {
        return true;
      }

      if (pairing.player2Id === null) {
        return false;
      }

      const player2Name = playerEntities[pairing.player2Id].name;

      return player2Name.toLowerCase().includes(filterText);
    }
  )
);

export const hasTournamentStarted = createSelector(
  getNumberOfRounds,
  (numberOfRounds: number) => numberOfRounds > 0
);

export const isTournamentOver = createSelector(
  getCompletedRoundId,
  getNumberOfRounds,
  (completedRound, numberOfRounds) => completedRound >= numberOfRounds
);

/**
 *
 */

export const getTournamentState = createSelector(
  getSwissState,
  state => state.tournament
);

export const isTournamentLoaded = createSelector(
  getTournamentState,
  fromTournament.isTournamentLoaded
);
