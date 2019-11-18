import { createReducer, on } from '@ngrx/store';
import { Message } from 'app/shared';
import { MessageActions } from '../actions';

export const messagesFeatureKey = 'messages';

export interface State {
  messages: Message[];
}

export const initialState: State = {
  messages: []
};

export const reducer = createReducer(
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

export const getMessages = (state: State) => state.messages;
