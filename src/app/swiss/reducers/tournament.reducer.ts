import { TournamentApiActions } from '../actions';

export interface State {
  completedRound: number;
  currentRound: number;
  numberOfRounds: number;
}

export const initialState: State = {
  completedRound: 0,
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

export const selectHasTournamentStarted = (state: State) => state.numberOfRounds > 0;

export const selectIsTournamentOver = (state: State) => state.completedRound >= state.numberOfRounds;

export const selectNumRounds = (state: State) => state.numberOfRounds;
