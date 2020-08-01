import * as fromRoot from '@mm/reducers';
import { Pairing, Round } from '@mm/shared/models';
import * as fromPairings from '@mm/swiss/reducers/pairings.reducer';
import * as fromRounds from '@mm/swiss/reducers/rounds.reducer';
import { Dictionary } from '@ngrx/entity';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export const swissFeatureKey = 'swiss';

export interface SwissState {
  [fromPairings.pairingsFeatureKey]: fromPairings.State;
  [fromRounds.roundsFeatureKey]: fromRounds.State;
}

export interface State extends fromRoot.State {
  [swissFeatureKey]: SwissState;
}

export function reducers(state: SwissState | undefined, action: Action) {
  return combineReducers({
    [fromPairings.pairingsFeatureKey]: fromPairings.reducer,
    [fromRounds.roundsFeatureKey]: fromRounds.reducer
  })(state, action);
}

/**
 * Module feature selector.
 */

export const getSwissState = createFeatureSelector<State, SwissState>(swissFeatureKey);

/**
 * Pairing selectors.
 */

 export const getPairingsState = createSelector(
   getSwissState,
   state => state.pairings
 );

 export const getSelectedPairingId = createSelector(
   getPairingsState,
   fromPairings.getSelectedPairingId
 );

 export const {
   selectIds: getPairingIds,
   selectEntities: getPairingEntities,
   selectAll: getAllPairings,
   selectTotal: getTotalPairings
 } = fromPairings.adapter.getSelectors(getPairingsState);

 export const getAllSubmittedPairings = createSelector(
   getAllPairings,
   pairings => pairings.filter(p => p.submitted)
 );

 export const getSelectedPairing = createSelector(
  getSelectedPairingId,
  getPairingEntities,
  (pairingId: number, pairings: Dictionary<Pairing>) => pairings[pairingId]
);

/**
 * Round selectors
 */

export const getRoundsState = createSelector(
  getSwissState,
  state => state.rounds
);

export const getCompletedRoundId = createSelector(
  getRoundsState,
  fromRounds.getCompletedRoundId
);

export const getNumberOfRounds = createSelector(
  getRoundsState,
  fromRounds.getNumberOfRounds
);

export const getRoundsLoaded = createSelector(
  getRoundsState,
  fromRounds.isLoaded
);

export const getSelectedRoundId = createSelector(
  getRoundsState,
  fromRounds.getSelectedRoundId
);

export const {
  selectIds: getRoundIds,
  selectEntities: getRoundEntities,
  selectAll: getAllRounds,
  selectTotal: getTotalRounds
} = fromRounds.adapter.getSelectors(getRoundsState);

export const canStartNextRound = createSelector(
  getCompletedRoundId,
  getTotalRounds,
  getNumberOfRounds,
  (completedRoundId, totalRounds, numberOfRounds) => totalRounds === completedRoundId && completedRoundId < numberOfRounds
);

export const getSelectedRound = createSelector(
  getRoundEntities,
  getSelectedRoundId,
  (roundEntities, selectedRoundId) => selectedRoundId && roundEntities[selectedRoundId]
);

export const hasCompletedRounds = createSelector(
  getCompletedRoundId,
  roundId => roundId > 0
);

export const hasTournamentStarted = createSelector(
  getNumberOfRounds,
  (numberOfRounds: number) => numberOfRounds > 0
);

export const isTournamentOver = createSelector(
  getCompletedRoundId,
  getNumberOfRounds,
  (completedRound, numberOfRounds) => completedRound >= numberOfRounds
);

/**
 * Combinations
 */

export const getSelectedRoundPairings = createSelector(
  getSelectedRound,
  getPairingEntities,
  (round: Round, pairings: Dictionary<Pairing>) => round ? round.pairingIds.map(id => pairings[id]) : []
);

export const getSelectedRoundComplete = createSelector(
  getSelectedRoundPairings,
  pairings => {
    if (pairings.length > 0) {
      return pairings.map(pairing => pairing.submitted).reduce((prev, cur) => prev && cur);
    } else {
      return false;
    }
  }
);

export const getSelectedRoundPairingsOutstandingTotal = createSelector(
  getSelectedRoundPairings,
  (pairings: Pairing[]) => pairings.filter(pairing => !pairing.submitted).length
);

export const getSelectedRoundPairingsSubmitted = createSelector(
  getSelectedRoundPairings,
  (pairings: Pairing[]) => pairings.filter(pairing => pairing.submitted)
);

// export const getStandings = createSelector(
//   getAllPlayers,
//   getAllSubmittedPairings,
//   (players, pairings) => calculateStandings(pairings, players)
// );

export const selectedRoundHasSubmittedPairings = createSelector(
  getSelectedRoundPairingsSubmitted,
  pairings => pairings.filter(p => p.player2Id).length > 0
);
