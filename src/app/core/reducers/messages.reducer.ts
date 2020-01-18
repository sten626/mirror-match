import { MessageActions } from '@app/core/actions';
import { Message } from '@app/shared/models';
import { Action, createReducer, on } from '@ngrx/store';

export const messagesFeatureKey = 'messages';

export interface State {
  messages: Message[];
}

export const initialState: State = {
  messages: []
};

const messagesReducer = createReducer(
  initialState,
  on(MessageActions.addMessage, (state, {message}) => ({
    ...state,
    messages: [...state.messages, message]
  })),
  on(MessageActions.deleteMessage, (state, {message}) => ({
    ...state,
    messages: state.messages.filter(m => m !== message)
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return messagesReducer(state, action);
}

export const getMessages = (state: State) => state.messages;
