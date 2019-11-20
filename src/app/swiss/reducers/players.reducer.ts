import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Player } from 'app/shared';
import { PlayersApiActions, SwissApiActions } from 'app/swiss/actions';

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

export const reducer = createReducer(
  initialState,
  on(PlayersApiActions.addPlayerSuccess, (state, {player}) => adapter.addOne(player, state)),
  on(PlayersApiActions.deletePlayerSuccess, (state, {playerId}) => adapter.removeOne(playerId, state)),
  on(PlayersApiActions.dropPlayersSuccess, (state, {players}) => adapter.updateMany(players, state)),
  on(PlayersApiActions.loadPlayers, state => ({
    ...state,
    loading: true
  })),
  on(PlayersApiActions.loadPlayersSuccess, (state, {players}) => adapter.addAll(players, {
    ...state,
    loaded: true,
    loading: false
  })),
  on(PlayersApiActions.updatePlayer, (state, {player}) => adapter.updateOne(player, state)),
  on(SwissApiActions.clearAllDataSuccess, state => adapter.removeAll(state))
);
