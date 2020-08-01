import * as fromPlayers from '@mm/core/reducers/players.reducer';
import * as fromTournament from '@mm/core/reducers/tournament.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  [fromPlayers.playersFeatureKey]: fromPlayers.State;
  [fromTournament.tournamentFeatureKey]: fromTournament.State;
}

export const ROOT_REDUCERS = {
  [fromPlayers.playersFeatureKey]: fromPlayers.reducer,
  [fromTournament.tournamentFeatureKey]: fromTournament.reducer
};

/**
 * Players Selectors
 */

export const selectPlayersState = createFeatureSelector<
  State,
  fromPlayers.State
>(fromPlayers.playersFeatureKey);

export const selectPlayerEntities = createSelector(
  selectPlayersState,
  fromPlayers.selectPlayerEntities
);

export const selectAllPlayers = createSelector(
  selectPlayersState,
  fromPlayers.selectAllPlayers
);

export const selectTotalPlayers = createSelector(
  selectPlayersState,
  fromPlayers.selectTotalPlayers
);

export const canBeginTournament = createSelector(
  selectTotalPlayers,
  (totalPlayers) => totalPlayers >= 4
);

export const selectActivePlayers = createSelector(selectAllPlayers, (players) =>
  players.filter((player) => !player.dropped)
);

export const selectActivePlayerIds = createSelector(
  selectActivePlayers,
  (players) => players.map((p) => p.id)
);

export const selectPlayerNamesLowerCaseSet = createSelector(selectAllPlayers, (players) => {
  const playerNames = new Set<string>();

  for (const player of players) {
    playerNames.add(player.name.toLowerCase());
  }

  return playerNames;
});

export const selectRecommendedTotalRounds = createSelector(
  selectTotalPlayers,
  (totalPlayers: number) => Math.max(3, Math.ceil(Math.log2(totalPlayers)))
);

/**
 * Tournament Selectors
 */

// export const selectTournamentDataState = createSelector(
//   selectTournamentState,
//   (state) => state[fromTournament.tournamentFeatureKey]
// );

export const selectTournamentState = createFeatureSelector<
  State,
  fromTournament.State
>(fromTournament.tournamentFeatureKey);

export const hasDraftStarted = createSelector(
  selectTournamentState,
  fromTournament.hasDraftStarted
);

export const hasSwissStarted = createSelector(
  selectTournamentState,
  fromTournament.hasSwissStarted
);

export const isDraft = createSelector(
  selectTournamentState,
  fromTournament.isDraft
);

export const hasAnythingStarted = createSelector(
  hasDraftStarted,
  hasSwissStarted,
  (draftStarted, swissStarted) => draftStarted || swissStarted
);
