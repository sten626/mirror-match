import { Message } from '@app/shared/models';
import { createAction, props } from '@ngrx/store';

export const addMessage = createAction(
  '[Message] Add Message',
  props<{message: Message}>()
);

export const deleteMessage = createAction(
  '[Message] Delete Message',
  props<{message: Message}>()
);
