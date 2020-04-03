import { MessageActions } from '@app/core/actions';
import { Message, MessageType } from '@app/shared';
import { initialState, reducer } from './messages.reducer';

describe('Messages Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Add Message', () => {
    it('should add a message to the empty state', () => {
      const message: Message = {
        text: 'Foo',
        type: MessageType.Info
      };
      const action = MessageActions.addMessage({message});

      const result = reducer(initialState, action);

      expect(result.messages).toEqual([message]);
    });
  });

  describe('Delete Message', () => {
    it('should delete a message from the state', () => {
      const message: Message = {
        text: 'Foo',
        type: MessageType.Info
      };

      const state = {
        ...initialState,
        messages: [message]
      };

      const action = MessageActions.deleteMessage({message});
      const result = reducer(state, action);

      expect(result.messages).toEqual([]);
    });

    it('should not affect an empty state', () => {
      const message: Message = {
        text: 'Foo',
        type: MessageType.Info
      };

      const action = MessageActions.deleteMessage({message});
      const result = reducer(initialState, action);

      expect(result.messages).toEqual([]);
    });

    it('should not remove a non-matching message', () => {
      const message1: Message = {
        text: 'Foo',
        type: MessageType.Info
      };

      const message2: Message = {
        text: 'Bar',
        type: MessageType.Info
      };

      const state = {
        ...initialState,
        messages: [message1]
      };

      const action = MessageActions.deleteMessage({message: message2});
      const result = reducer(state, action);

      expect(result.messages).toEqual([message1]);
    });
  });
});
