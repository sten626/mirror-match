import { Action } from '@ngrx/store';


export const messagesFeatureKey = 'messages';

export interface State {
  messages: string[];
}

export const initialState: State = {
  messages: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}
