import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

import { Player } from '../../shared';
import { PlayersPageActions } from '../actions';

export interface State extends EntityState<Player> {

}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: PlayersPageActions.PlayersPageActionsUnion): State {
  switch (action.type) {
    case PlayersPageActions.PlayerPageActionTypes.AddPlayer: {
      return adapter.addOne(action.payload, state);
    }
  }
}
