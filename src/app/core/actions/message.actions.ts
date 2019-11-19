import { createAction, props } from '@ngrx/store';
import { Message } from 'app/shared';

export const addMessage = createAction(
  '[Message] Add Message',
  props<{message: Message}>()
);

export const deleteMessage = createAction(
  '[Message] Delete Message',
  props<{message: Message}>()
);
