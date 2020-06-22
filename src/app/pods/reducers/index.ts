import * as fromPods from '@app/pods/reducers/pods.reducer';
import * as fromRoot from '@app/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  [fromPods.podsFeatureKey]: fromPods.State;
}

/* Pods selectors */

export const selectPodsState = createFeatureSelector<State, fromPods.State>(
  fromPods.podsFeatureKey
);

export const selectPods = createSelector(selectPodsState, fromPods.selectPods);

export const selectPodsLoaded = createSelector(
  selectPodsState,
  fromPods.selectLoaded
);

/* Combinations */

export const selectPodPlayerNames = createSelector(
  selectPods,
  fromRoot.selectPlayerEntities,
  (pods, playerEntities) =>
    pods.map((pod) => pod.map((playerId) => playerEntities[playerId].name))
);
