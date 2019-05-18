import { TournamentApiActions, SwissPageActions, PlayersPageActions } from '../actions';

export interface State {
  completedRound: number;
  currentRound: number;
  loaded: boolean;
  loading: boolean;
  numberOfRounds: number;
}

export const initialState: State = {
  completedRound: 0,
  currentRound: 0,
  loaded: false,
  loading: false,
  numberOfRounds: 0
};

export function reducer(
  state = initialState,
  action: PlayersPageActions.PlayersPageActionsUnion
  | SwissPageActions.SwissPageActionsUnion
  | TournamentApiActions.TournamentApiActionsUnion
): State {
  switch (action.type) {
    case PlayersPageActions.PlayerPageActionTypes.LoadTournament: {
      return {
        ...state,
        loading: true
      };
    }
    case SwissPageActions.SwissPageActionTypes.LoadTournament: {
      return {
        ...state,
        loading: true
      };
    }
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
        ...action.payload,
        loaded: true
      };
    }
    default: {
      return state;
    }
  }
}

export const hasTournamentStarted = (state: State) => state.numberOfRounds > 0;

export const isTournamentOver = (state: State) => state.completedRound >= state.numberOfRounds;

export const getNumberOfRounds = (state: State) => state.numberOfRounds;
