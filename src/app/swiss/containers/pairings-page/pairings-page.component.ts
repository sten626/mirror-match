import { Component } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Pairing, Player } from '@app/shared';
import { PairingsPageActions } from '@app/swiss/actions';
import * as fromSwiss from '@app/swiss/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './pairings-page.component.html'
})
export class PairingsPageComponent {
  canStartNextRound$: Observable<boolean>;
  hasTournamentStarted$: Observable<boolean>;
  hasSubmittedPairings$: Observable<boolean>;
  numberOfRounds$: Observable<number>;
  pairings$: Observable<Pairing[]>;
  pairingsExist$: Observable<boolean>;
  pairingsFilterText$: Observable<string>;
  playerEntities$: Observable<Dictionary<Player>>;
  roundIds$: Observable<number[] | string[]>;
  selectedPairing$: Observable<Pairing>;
  selectedRoundComplete$: Observable<boolean>;
  selectedRoundId$: Observable<number>;

  constructor(
    private store: Store<fromSwiss.State>
  ) {
    this.canStartNextRound$ = this.store.pipe(
      select(fromSwiss.canStartNextRound)
    );
    this.hasTournamentStarted$ = this.store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
    this.hasSubmittedPairings$ = this.store.pipe(
      select(fromSwiss.selectedRoundHasSubmittedPairings)
    );
    this.numberOfRounds$ = this.store.pipe(
      select(fromSwiss.getNumberOfRounds)
    );
    this.pairings$ = this.store.pipe(
      select(fromSwiss.getSelectedRoundPairings)
    );
    this.pairingsExist$ = this.pairings$.pipe(
      map(pairings => pairings.length > 0)
    );
    this.playerEntities$ = this.store.pipe(
      select(fromSwiss.getPlayerEntities)
    );
    this.roundIds$ = this.store.pipe(
      select(fromSwiss.getRoundIds)
    );
    this.selectedPairing$ = this.store.pipe(
      select(fromSwiss.getSelectedPairing)
    );
    this.selectedRoundComplete$ = this.store.pipe(
      select(fromSwiss.getSelectedRoundComplete)
    );
    this.selectedRoundId$ = this.store.pipe(
      select(fromSwiss.getSelectedRoundId)
    );
  }

  /**
   * Dispatch an action to change the selected round.
   * @param roundId A numerical round ID.
   */
  onChangeSelectedRound(roundId: number) {
    this.store.dispatch(PairingsPageActions.changeSelectedRound({roundId}));
  }

  /**
   * Dispatch a clearMatchResult action for a given Pairing.
   * @param pairing The Pairing to be cleared.
   */
  onClearMatchResult(pairing: Pairing): void {
    if (pairing) {
      this.store.dispatch(PairingsPageActions.clearMatchResult({pairing}));
    }
  }

  /**
   * Dispatch an action to create the next round.
   */
  onCreateNextRound(): void {
    this.store.dispatch(PairingsPageActions.createNextRound());
  }

  /**
   * Dispatch an action to create pairings for a given round.
   * @param roundId The ID of the round to create pairings for.
   */
  onCreatePairings(roundId: number) {
    if (roundId) {
      this.store.dispatch(PairingsPageActions.createPairings({roundId}));
    }
  }

  /**
   * Dispatch an action to clear the results for given Pairings.
   * @param pairings List of Pairing objects.
   */
  onDeleteResults(pairings: Pairing[]) {
    if (pairings && pairings.length > 0) {
      this.store.dispatch(PairingsPageActions.clearResults({pairings}));
    }
  }

  /**
   * Dispatch an action to drop the given Players from the tournament.
   * @param players List of Player objects.
   */
  onDropPlayers(players: Player[]) {
    if (players && players.length > 0) {
      this.store.dispatch(PairingsPageActions.dropPlayers({players}));
    }
  }

  /**
   * Dispatch an action to delete all pairings for the given round.
   * @param roundId Numerical ID of a round.
   */
  onRedoMatches(roundId: number) {
    if (roundId) {
      this.store.dispatch(PairingsPageActions.deletePairings({roundId}));
    }
  }

  /**
   * Dispatch an action to set a Pairing as the selected Pairing.
   * @param pairing A Pairing to be selected.
   */
  onSelectPairing(pairing: Pairing) {
    if (pairing && pairing.player2Id) {
      this.store.dispatch(PairingsPageActions.selectPairing({pairingId: pairing.id}));
    }
  }

  /**
   * Dispatch an action to submit the results of a Pairing.
   * @param pairing A Pairing to be submitted
   */
  onSubmitResult(pairing: Pairing) {
    if (pairing) {
      this.store.dispatch(PairingsPageActions.submitResult({pairing}));
    }
  }
}
