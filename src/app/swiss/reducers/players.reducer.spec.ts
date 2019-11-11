import { Update } from '@ngrx/entity';
import { Player } from 'app/shared';
import { PlayersApiActions } from 'app/swiss/actions';
import * as fromPlayers from 'app/swiss/reducers/players.reducer';

describe('PlayersReducer', () => {
  const player1: Player = {
    id: 1,
    name: 'Steven',
    dropped: false,
  };
  const player2: Player = {
    id: 2,
    name: 'Jasper',
    dropped: false
  };
  const player3: Player = {
    id: 3,
    name: 'Spike',
    dropped: false
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

  describe('Add Player Success', () => {
    it('should add a player to the state', () => {
      const { initialState } = fromPlayers;
      const action = PlayersApiActions.addPlayerSuccess({ player: player1 });
      const state = fromPlayers.reducer(initialState, action);

      expect(state.entities[player1.id]).toEqual(player1);
    });
  });

  describe('Delete Player Success', () => {
    it('should remove a player from the state', () => {
      const action = PlayersApiActions.deletePlayerSuccess({
        playerId: player1.id
      });
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
      const action = PlayersApiActions.deletePlayerSuccess({ playerId: player3.id });
      const state = fromPlayers.reducer(populatedState, action);

      expect(state).toEqual(populatedState);
    });
  });

  describe('Load Players', () => {
    it('should set loading to true', () => {
      const { initialState } = fromPlayers;
      const action = PlayersApiActions.loadPlayers();
      const state = fromPlayers.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('Load Players Success', () => {
    it('should add players to state and set loaded to true', () => {
      const { initialState } = fromPlayers;
      const players = [player1, player2];
      const action = PlayersApiActions.loadPlayersSuccess({ players });
      const expectedResult: fromPlayers.State = {
        ids: [player1.id, player2.id],
        entities: {
          [player1.id]: player1,
          [player2.id]: player2
        },
        loaded: true,
        loading: false
      };
      const state = fromPlayers.reducer(initialState, action);

      expect(state).toEqual(expectedResult);
    });
  });

  describe('Update Player', () => {
    it('should update player name', () => {
      const playerChanges: Update<Player> = {
        id: player1.id,
        changes: {
          name: 'Sten'
        }
      };
      const action = PlayersApiActions.updatePlayer({ player: playerChanges });
      const state = fromPlayers.reducer(populatedState, action);

      expect(state.entities['1'].name).toEqual('Sten');
    });
  });
});
