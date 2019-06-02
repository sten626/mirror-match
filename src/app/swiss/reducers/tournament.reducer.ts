import { TournamentApiActions } from 'app/swiss/actions';

export interface State {
  completedRound: number;
  currentRound: number;
  loaded: boolean;
  loading: boolean;
  selectedRound: number;
}

export const initialState: State = {
  completedRound: 0,
  currentRound: 0,
  loaded: false,
  loading: false,
  selectedRound: 1
};

export function reducer(
  state = initialState,
  action: TournamentApiActions.TournamentApiActionsUnion
): State {
  switch (action.type) {
    case TournamentApiActions.TournamentApiActionTypes.BeginEventSuccess: {
      const numOfRounds = action.payload;
      return {
        ...state,
        currentRound: 1
      };
    }
    case TournamentApiActions.TournamentApiActionTypes.LoadTournament: {
      return {
        ...state,
        loading: true
      };
    }
    case TournamentApiActions.TournamentApiActionTypes.LoadTournamentFailure: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case TournamentApiActions.TournamentApiActionTypes.LoadTournamentSuccess: {
      return {
        ...state,
        ...action.payload,
        loaded: true,
        loading: false
      };
    }
    case TournamentApiActions.TournamentApiActionTypes.SetSelectedRoundSuccess: {
      return {
        ...state,
        selectedRound: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const isTournamentLoaded = (state: State) => state.loaded;

export const getCurrentRound = (state: State) => state.currentRound;

export const getSelectedRound = (state: State) => state.selectedRound;
