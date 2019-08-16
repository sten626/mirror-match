import { ActionReducerMap, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMessages from 'app/core/reducers/messages.reducer';
import { InjectionToken } from '@angular/core';

export interface State {
  [fromMessages.messagesFeatureKey]: fromMessages.State;
}

export const rootReducers = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromMessages.messagesFeatureKey]: fromMessages.reducer
  })
});

export const getMessagesState = createFeatureSelector<State, fromMessages.State>(
  fromMessages.messagesFeatureKey
);

export const getMessages = createSelector(
  getMessagesState,
  fromMessages.getMessages
);
