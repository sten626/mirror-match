import { InjectionToken } from '@angular/core';
import * as fromLayout from '@app/core/reducers/layout.reducer';
import * as fromMessages from '@app/core/reducers/messages.reducer';
import * as fromPlayers from '@app/core/reducers/players.reducer';
import { Player } from '@app/shared/models';
import * as fromRouter from '@ngrx/router-store';
import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  [fromMessages.messagesFeatureKey]: fromMessages.State;
  [fromPlayers.playersFeatureKey]: fromPlayers.State;
  router: fromRouter.RouterReducerState<any>;
}

export const rootReducers = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    [fromMessages.messagesFeatureKey]: fromMessages.reducer,
    [fromPlayers.playersFeatureKey]: fromPlayers.reducer,
    router: fromRouter.routerReducer
  })
});

/**
 * Layout Reducers
 */

export const getLayoutState = createFeatureSelector<State, fromLayout.State>(
  fromLayout.layoutFeatureKey
);

export const selectShowSidenav = createSelector(
  getLayoutState,
  fromLayout.selectShowSidenav
);

/**
 * Messages Reducers
 */

export const getMessagesState = createFeatureSelector<State, fromMessages.State>(
  fromMessages.messagesFeatureKey
);

export const getMessages = createSelector(
  getMessagesState,
  fromMessages.getMessages
);

/**
 * Players Reducers
 */

 export const selectPlayersState = createFeatureSelector<State, fromPlayers.State>(fromPlayers.playersFeatureKey);

 export const {
  selectIds: getPlayerIds,
  selectEntities: getPlayerEntities,
  selectAll: getAllPlayers,
  selectTotal: getTotalPlayers
} = fromPlayers.adapter.getSelectors(selectPlayersState);

export const canBeginTournament = createSelector(
  getTotalPlayers,
  (totalPlayers: number) => totalPlayers >= 4
);

export const getActivePlayers = createSelector(
  getAllPlayers,
  (players) => players.filter((player) => !player.dropped)
);

export const getActivePlayerIds = createSelector(
  getActivePlayers,
  players => players.map(p => p.id)
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
 * Router Reducers
 */

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectRouteParam,
  selectRouteParams,
  selectUrl
} = fromRouter.getSelectors(selectRouter);
