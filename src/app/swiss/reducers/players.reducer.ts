import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Player } from '../../shared';
import { PlayersApiActions } from '../actions';


export interface State extends EntityState<Player> {

}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>({
  selectId: (player: Player) => player.id || null
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: PlayersApiActions.PlayersApiActionsUnion): State {
  switch (action.type) {
    case PlayersApiActions.PlayersApiActionTypes.LoadPlayersSuccess: {
      return adapter.addMany(action.payload, state);
    }
    case PlayersApiActions.PlayersApiActionTypes.AddPlayerSuccess: {
      return adapter.addOne(action.payload, state);
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
