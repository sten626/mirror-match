import { LayoutActions } from '@app/core/actions';
import { Action, createReducer, on } from '@ngrx/store';

export const layoutFeatureKey = 'layout';

export interface State {
  showSidenav: boolean;
}

export const initialState: State = {
  showSidenav: true
};

const layoutReducer = createReducer(
  initialState,
  on(LayoutActions.closeSidenav, state => ({
    ...state,
    showSidenav: false
  })),
  on(LayoutActions.openSidenav, state => ({
    ...state,
    showSidenav: true
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return layoutReducer(state, action);
}

export const selectShowSidenav = (state: State) => state.showSidenav;
