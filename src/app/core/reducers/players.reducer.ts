import { PlayersApiActions } from '@mm/core/actions';
import { Player } from '@mm/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

export const playersFeatureKey = 'players';

export interface State extends EntityState<Player> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false
});

const playersReducer = createReducer(
  initialState,
  on(PlayersApiActions.addPlayerSuccess, (state, { player }) =>
    adapter.addOne(player, state)
  ),
  on(PlayersApiActions.clearPlayersSuccess, (state) =>
    adapter.removeAll(state)
  ),
  on(PlayersApiActions.deletePlayerSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(PlayersApiActions.dropPlayersSuccess, (state, { players }) =>
    adapter.updateMany(players, state)
  ),
  on(PlayersApiActions.loadPlayers, (state) => ({
    ...state,
    loading: true
  })),
  on(PlayersApiActions.loadPlayersSuccess, (state, { players }) =>
    adapter.setAll(players, {
      ...state,
      loaded: true,
      loading: false
    })
  ),
  on(PlayersApiActions.updatePlayerSuccess, (state, { update }) =>
    adapter.updateOne(update, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return playersReducer(state, action);
}

export const {
  selectIds: selectPlayerIds,
  selectEntities: selectPlayerEntities,
  selectAll: selectAllPlayers,
  selectTotal: selectTotalPlayers
} = adapter.getSelectors();
