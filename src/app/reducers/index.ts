import * as fromPlayers from '@app/core/reducers/players.reducer';
import * as fromTournament from '@app/core/reducers/tournament.reducer';
import * as fromRouter from '@ngrx/router-store';
import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export interface State {
  [fromPlayers.playersFeatureKey]: fromPlayers.State;
  [fromTournament.tournamentFeatureKey]: fromTournament.State;
  router: fromRouter.RouterReducerState<any>;
}

export const rootReducers: ActionReducerMap<State, Action> = {
  [fromPlayers.playersFeatureKey]: fromPlayers.reducer,
  [fromTournament.tournamentFeatureKey]: fromTournament.reducer,
  router: fromRouter.routerReducer
};

/**
 * Players Reducers
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

export const getActivePlayers = createSelector(selectAllPlayers, (players) =>
  players.filter((player) => !player.dropped)
);

export const getActivePlayerIds = createSelector(getActivePlayers, (players) =>
  players.map((p) => p.id)
);

export const getDroppedPlayers = createSelector(selectAllPlayers, (players) =>
  players.filter((player) => player.dropped)
);

export const getRecommendedTotalRounds = createSelector(
  selectTotalPlayers,
  (totalPlayers: number) => Math.max(3, Math.ceil(Math.log2(totalPlayers)))
);

export const getTotalActivePlayers = createSelector(
  getActivePlayers,
  (activePlayers) => activePlayers.length
);

export const getTotalDroppedPlayers = createSelector(
  getDroppedPlayers,
  (players) => players.length
);

/**
 * Tournament Reducers
 */

export const selectTournamentState = createFeatureSelector<
  State,
  fromTournament.State
>(fromTournament.tournamentFeatureKey);

export const getBestOf = createSelector(
  selectTournamentState,
  (state) => state.bestOf
);

export const getIsDraft = createSelector(
  selectTournamentState,
  (state) => state.isDraft
);

/**
 * Router Reducers
 */

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');

const { selectUrl } = fromRouter.getSelectors(selectRouter);

export const getUrl = createSelector(selectUrl, (url) => url);
