import { MessageActions } from 'app/core/actions';
import { Message, MessageType } from 'app/shared';
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
});
