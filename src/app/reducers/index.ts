import { ActionReducerMap, Action } from '@ngrx/store';
import * as fromMessages from 'app/core/reducers/messages.reducer';
import { InjectionToken } from '@angular/core';

export interface State {
  [fromMessages.messagesFeatureKey]: fromMessages.State;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromMessages.messagesFeatureKey]: fromMessages.reducer
  })
});

// export const reducers: ActionReducerMap<State> = {};
