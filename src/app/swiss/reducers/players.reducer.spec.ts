import { AddPlayerFailure, AddPlayerSuccess, DeletePlayerFailure, DeletePlayerSuccess } from '../actions/players-api.actions';
import { LoadPlayers } from '../actions/players-page.actions';
import * as fromPlayers from './players.reducer';

describe('PlayersReducer', () => {
  const player1 = {
    id: '1',
    name: 'Steven'
  };
  const player2 = {
    id: '2',
    name: 'Jasper'
  };
  const player3 = {
    id: '3',
    name: 'Spike'
  };
  const populatedState: fromPlayers.State = {
    ids: [player1.id, player2.id],
    entities: {
      [player1.id]: player1,
      [player2.id]: player2
    },
    loaded: true,
    loading: false
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPlayers;
      const action = {} as any;
      const state = fromPlayers.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ADD_PLAYER_FAILURE', () => {
    it('should return the state unchanged', () => {
      const { initialState } = fromPlayers;
      const action = new AddPlayerFailure(player1);
      const state = fromPlayers.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('ADD_PLAYER_SUCCESS', () => {
    it('should add a player to the state', () => {
      const { initialState } = fromPlayers;
      const action = new AddPlayerSuccess(player1);
      const state = fromPlayers.reducer(initialState, action);

      expect(state.entities['1']).toEqual(player1);
    });
  });

  describe('DELETE_PLAYER_FAILURE', () => {
    it('should leave the state unchanged', () => {
      const action = new DeletePlayerFailure(player1);
      const state = fromPlayers.reducer(populatedState, action);

      expect(state).toEqual(populatedState);
    });
  });

  describe('DELETE_PLAYER_SUCCESS', () => {
    it('should remove a player from the state', () => {
      const action = new DeletePlayerSuccess(player1.id);
      const expectedResult: fromPlayers.State = {
        ids: [player2.id],
        entities: {
          [player2.id]: player2
        },
        loaded: true,
        loading: false
      };
      const state = fromPlayers.reducer(populatedState, action);

      expect(state).toEqual(expectedResult);
    });

    it('should leave state unchanged when trying to delete a nonexistant player', () => {
      const action = new DeletePlayerSuccess(player3.id);
      const state = fromPlayers.reducer(populatedState, action);

      expect(state).toEqual(populatedState);
    });
  });

  describe('LOAD_PLAYERS', () => {
    it('should set loading to true', () => {
      const { initialState } = fromPlayers;
      const action = new LoadPlayers();
      const state = fromPlayers.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });
});
