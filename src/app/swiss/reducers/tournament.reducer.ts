import { TournamentApiActions } from '../actions';

export interface State {
  currentRound: number;
  numberOfRounds: number;
}

export const initialState: State = {
  currentRound: 0,
  numberOfRounds: 0
};

export function reducer(state = initialState, action: TournamentApiActions.TournamentApiActionsUnion): State {
  switch (action.type) {
    case TournamentApiActions.TournamentApiActionTypes.BeginEventSuccess: {
      const numOfRounds = action.payload;
      return {
        ...state,
        currentRound: 1,
        numberOfRounds: numOfRounds
      };
    }
    case TournamentApiActions.TournamentApiActionTypes.LoadTournamentSuccess: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
}
