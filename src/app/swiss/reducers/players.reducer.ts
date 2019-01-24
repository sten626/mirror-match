import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

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
    case PlayersApiActions.PlayersApiActionTypes.AddPlayerSuccess: {
      return adapter.addOne(action.payload, state);
    }
  }
}
