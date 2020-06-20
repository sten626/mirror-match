import { PodsApiActions, PodsPageActions } from '@app/pods/actions';
import { Action, createReducer, on } from '@ngrx/store';

export const podsFeatureKey = 'pods';

export interface State {
  loaded: boolean;
  loading: boolean;
  pods: number[][];
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
  on(PodsApiActions.loadPodsSuccess, (_, { pods }) => ({
    loaded: true,
    loading: false,
    pods: [...pods]
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return podsReducer(state, action);
}

export const getLoaded = (state: State) => state.loaded;
