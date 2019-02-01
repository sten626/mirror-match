import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Player } from '../../shared';
import { PlayersApiActions, PlayersPageActions } from '../actions';
import { createSelector } from '@ngrx/store';


export interface State extends EntityState<Player> {
  selectedPlayerId: string | null;
}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>({
  selectId: (player: Player) => player.id || null
});

export const initialState: State = adapter.getInitialState({
  selectedPlayerId: null
});

export function reducer(
  state = initialState,
  action:
    PlayersApiActions.PlayersApiActionsUnion |
    PlayersPageActions.PlayersPageActionsUnion
): State {
  switch (action.type) {
    case PlayersApiActions.PlayersApiActionTypes.AddPlayerSuccess: {
      return adapter.addOne(action.payload, state);
    }
    case PlayersApiActions.PlayersApiActionTypes.AddPlayerFailure: {
      return {
        ...state
      };
    }
    case PlayersApiActions.PlayersApiActionTypes.LoadPlayersSuccess: {
      return adapter.addMany(action.payload, state);
    }
    case PlayersApiActions.PlayersApiActionTypes.UpdatePlayerNameFailure: {
      return state;
    }
    case PlayersApiActions.PlayersApiActionTypes.UpdatePlayerNameSuccess: {
      return adapter.updateOne(action.payload.player, state);
    }
    case PlayersPageActions.PlayerPageActionTypes.SelectPlayer: {
      return {
        ...state,
        selectedPlayerId: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getSelectedPlayerId = (state: State) => state.selectedPlayerId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectPlayerIds = selectIds;
export const selectPlayerEntities = selectEntities;
export const selectAllPlayers = selectAll;
export const selectPlayerTotal = selectTotal;

export const getSelectedPlayer = createSelector(
  selectPlayerEntities,
  getSelectedPlayerId,
  (players, selectedPlayerId) => {
    return selectedPlayerId && players[selectedPlayerId];
  }
);
