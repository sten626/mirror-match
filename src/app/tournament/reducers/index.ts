import * as fromRoot from '@app/reducers';
import { PodListData } from '@app/shared/models';
import * as fromPlayers from '@app/tournament/reducers/players.reducer';
import * as fromPods from '@app/tournament/reducers/pods.reducer';
import * as fromTournament from '@app/tournament/reducers/tournament.reducer';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export const tournamentFeatureKey = 'tournament';

export interface TournamentState {
  [fromPlayers.playersFeatureKey]: fromPlayers.State;
  [fromPods.podsFeatureKey]: fromPods.State;
  [fromTournament.tournamentFeatureKey]: fromTournament.State;
}

export interface State extends fromRoot.State {
  [tournamentFeatureKey]: TournamentState;
}

export function reducers(state: TournamentState | undefined, action: Action) {
  return combineReducers({
    [fromPlayers.playersFeatureKey]: fromPlayers.reducer,
    [fromPods.podsFeatureKey]: fromPods.reducer,
    [fromTournament.tournamentFeatureKey]: fromTournament.reducer
  })(state, action);
}

export const selectTournamentState = createFeatureSelector<
  State,
  TournamentState
>(tournamentFeatureKey);

/**
 * Players Selectors
 */

export const selectPlayersState = createSelector(
  selectTournamentState,
  (state) => state[fromPlayers.playersFeatureKey]
);

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

export const selectRecommendedTotalRounds = createSelector(
  selectTotalPlayers,
  (totalPlayers: number) => Math.max(3, Math.ceil(Math.log2(totalPlayers)))
);

/**
 * Pods Selectors
 */

export const selectPodsState = createSelector(
  selectTournamentState,
  (state) => state[fromPods.podsFeatureKey]
);

export const selectPods = createSelector(selectPodsState, fromPods.selectPods);

export const selectPodsLoaded = createSelector(
  selectPodsState,
  fromPods.selectLoaded
);

/**
 * Tournament Selectors
 */

export const selectTournamentDataState = createSelector(
  selectTournamentState,
  (state) => state[fromTournament.tournamentFeatureKey]
);

export const hasDraftStarted = createSelector(
  selectTournamentDataState,
  fromTournament.hasDraftStarted
);

export const hasSwissStarted = createSelector(
  selectTournamentDataState,
  fromTournament.hasSwissStarted
);

export const isDraft = createSelector(
  selectTournamentDataState,
  fromTournament.isDraft
);

export const hasAnythingStarted = createSelector(
  hasDraftStarted,
  hasSwissStarted,
  (draftStarted, swissStarted) => draftStarted || swissStarted
);

/**
 * Combinations
 */

export const selectPodListData = createSelector(
  selectPods,
  selectPlayerEntities,
  (pods, playerEntities) =>
    pods.map(
      (pod, index) =>
        ({
          table: index + 1,
          playerNames: pod.map((id) => playerEntities[id].name)
        } as PodListData)
    )
);
