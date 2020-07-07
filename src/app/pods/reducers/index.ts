import * as fromPods from '@app/pods/reducers/pods.reducer';
import * as fromRoot from '@app/reducers';
import { PodListData } from '@app/shared/models';
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
