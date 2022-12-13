import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMessages from 'app/core/reducers/messages.reducer';

export interface State {
  [fromMessages.messagesFeatureKey]: fromMessages.State;
}

// export const rootReducers = new InjectionToken<
//   ActionReducerMap<State, Action>
// >('Root reducers token', {
//   factory: () => ({
//     [fromMessages.messagesFeatureKey]: fromMessages.reducer
//   })
// });
export const rootReducers = {
  [fromMessages.messagesFeatureKey]: fromMessages.reducer,
};

export const getMessagesState = createFeatureSelector<fromMessages.State>(
  fromMessages.messagesFeatureKey
);

export const getMessages = createSelector(
  getMessagesState,
  fromMessages.getMessages
);
