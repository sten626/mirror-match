import * as fromPlayers from './players.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface SwissState {
  players: fromPlayers.State;
}

export interface State {
  swiss: SwissState;
}

export const reducers: ActionReducerMap<SwissState, any> = {
  players: fromPlayers.reducer
};
