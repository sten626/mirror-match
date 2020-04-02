import { Message } from '@app/shared';
import { createAction, props } from '@ngrx/store';

export const addMessage = createAction(
  '[Message] Add Message',
  props<{message: Message}>()
);

export const deleteMessage = createAction(
  '[Message] Delete Message',
  props<{message: Message}>()
);
