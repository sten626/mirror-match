import * as fromPods from '@app/pods/reducers/pods.reducer';
import * as fromRoot from '@app/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// export const podsFeatureKey = 'pods';

// export interface PodsState {
//   [fromPods.podsFeatureKey]: fromPods.State;
// }

export interface State extends fromRoot.State {
  [fromPods.podsFeatureKey]: fromPods.State;
}

// export function reducers(state: fromPods.State | undefined, action: Action) {
//   return combineReducers({
//     [fromPods.podsFeatureKey]: fromPods.reducer
//   })(state, action);
// }

export const selectPodsState = createFeatureSelector<State, fromPods.State>(
  fromPods.podsFeatureKey
);

export const selectPodsLoaded = createSelector(
  selectPodsState,
  fromPods.getLoaded
);
