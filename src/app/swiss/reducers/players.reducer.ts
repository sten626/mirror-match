import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Player } from '../../shared';
import { PlayersApiActions, PlayersPageActions } from '../actions';

export interface State extends EntityState<Player> {}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>({
  selectId: (player: Player) => player.id || null
});

export const initialState: State = adapter.getInitialState();

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
    case PlayersApiActions.PlayersApiActionTypes.DeletePlayerSuccess: {
      return adapter.removeOne(action.payload.key, state);
    }
    case PlayersApiActions.PlayersApiActionTypes.LoadPlayersSuccess: {
      return adapter.addMany(action.payload, state);
    }
    case PlayersApiActions.PlayersApiActionTypes.UpdatePlayerNameFailure: {
      return state;
    }
    case PlayersApiActions.PlayersApiActionTypes.UpdatePlayerNameSuccess: {
      return adapter.updateOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

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
