import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pairing } from 'app/shared';
import { PairingsApiActions } from '../actions';

export interface State {
  pairings: {[id: number]: Pairing[]};
}

export const initialState: State = {
  pairings: {}
};

export function reducer(
  state = initialState,
  action: PairingsApiActions.PairingsApiActionsUnion
): State {
  switch (action.type) {
    case PairingsApiActions.PairingsApiActionTypes.CreatePairingsSuccess: {
      const {round, pairings} = action.payload;
      const newPairings = {
        ...state.pairings,
      };
      newPairings[round] = pairings;

      return {
        ...state,
        pairings: newPairings
      };
    }
    default: {
      return state;
    }
  }
};
