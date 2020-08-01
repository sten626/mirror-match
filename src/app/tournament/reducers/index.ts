import * as fromRoot from '@mm/reducers';
import { PodListData } from '@mm/shared/models';
import * as fromPods from '@mm/tournament/reducers/pods.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const tournamentFeatureKey = 'tournament';

export interface State extends fromRoot.State {
  [fromPods.podsFeatureKey]: fromPods.State;
}

/**
 * Pods Selectors
 */

export const selectPodsState = createFeatureSelector<State, fromPods.State>(
  fromPods.podsFeatureKey
);

export const selectPods = createSelector(selectPodsState, fromPods.selectPods);

export const selectPodsLoaded = createSelector(
  selectPodsState,
  fromPods.selectLoaded
);

/**
 * Combinations
 */

export const selectPodListData = createSelector(
  selectPods,
  fromRoot.selectPlayerEntities,
  (pods, playerEntities) =>
    pods.map(
      (pod, index) =>
        ({
          table: index + 1,
          playerNames: pod.map((id) => playerEntities[id].name)
        } as PodListData)
    )
);
