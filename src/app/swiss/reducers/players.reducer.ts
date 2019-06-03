import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Player } from 'app/shared';
import { PlayersApiActions, PlayersPageActions } from 'app/swiss/actions';

export interface State extends EntityState<Player> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>({
  selectId: (player: Player) => player.id || null
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false
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
    case PlayersApiActions.PlayersApiActionTypes.DeletePlayerSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }
    case PlayersApiActions.PlayersApiActionTypes.DropPlayerSuccess: {
      return adapter.updateOne(action.payload, state);
    }
    case PlayersApiActions.PlayersApiActionTypes.LoadPlayersFailure: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case PlayersApiActions.PlayersApiActionTypes.LoadPlayersSuccess: {
      const newState = adapter.addMany(action.payload, state);
      return {
        ...newState,
        loaded: true,
        loading: false
      };
    }
    case PlayersApiActions.PlayersApiActionTypes.UpdatePlayerSuccess: {
      return adapter.updateOne(action.payload, state);
    }
    case PlayersApiActions.PlayersApiActionTypes.LoadPlayers: {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return state;
    }
  }
}
