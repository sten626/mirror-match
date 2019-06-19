import { Component } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Pairing, Player } from 'app/shared';
import { PairingsPageActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './pairings-page.component.html'
})
export class PairingsPageComponent {
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
    this.hasTournamentStarted$ = this.store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
    this.hasSubmittedPairings$ = this.store.pipe(
      select(fromSwiss.getSelectedRoundPairingsSubmitted),
      map((pairings: Pairing[]) => pairings.length > 0)
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

  clearMatchResult(pairing: Pairing) {
    this.store.dispatch(PairingsPageActions.clearMatchResult({pairing}));
  }

  createPairings(roundId: number) {
    this.store.dispatch(PairingsPageActions.createPairings({roundId}));
  }

  deleteResults(pairings: Pairing[]) {
    this.store.dispatch(PairingsPageActions.clearResults({pairings}));
  }

  dropPlayers(players: Player[]) {
    this.store.dispatch(PairingsPageActions.dropPlayers({players}));
  }

  redoMatches(roundId: number) {
    this.store.dispatch(PairingsPageActions.deletePairings({roundId}));
  }

  roundChanged(roundId: number) {
    this.store.dispatch(PairingsPageActions.changeSelectedRound({roundId}));
  }

  selectPairing(pairingId: number) {
    this.store.dispatch(PairingsPageActions.selectPairing({pairingId}));
  }

  submitResult(pairing: Pairing) {
    this.store.dispatch(PairingsPageActions.submitResult({pairing}));
  }
}
