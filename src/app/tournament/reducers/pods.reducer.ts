import { Pod } from '@mm/shared/models';
import { PodsApiActions, PodsPageActions } from '@mm/tournament/actions';
import { Action, createReducer, on } from '@ngrx/store';

export const podsFeatureKey = 'pods';

export interface State {
  loaded: boolean;
  loading: boolean;
  pods: Pod[];
}

export const initialState: State = {
  loaded: false,
  loading: false,
  pods: []
};

const podsReducer = createReducer(
  initialState,
  on(PodsPageActions.enter, (state) => ({
    ...state,
    loading: true
  })),
  on(
    PodsApiActions.loadPodsSuccess,
    PodsApiActions.setDraftPodsSuccess,
    (state, { pods }) => ({
      ...state,
      loaded: true,
      loading: false,
      pods: [...pods]
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return podsReducer(state, action);
}

export const selectLoaded = (state: State) => state.loaded;
export const selectPods = (state: State) => state.pods;
