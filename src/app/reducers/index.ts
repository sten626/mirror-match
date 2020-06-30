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
 * Tournament Reducers
 */

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

/**
 * Router Reducers
 */

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');

const { selectUrl } = fromRouter.getSelectors(selectRouter);

export const getUrl = createSelector(selectUrl, (url) => url);
