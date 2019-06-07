import { Component } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Pairing, Player } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PairingsPageActions } from '../actions';

@Component({
  templateUrl: './pairings-page.component.html'
})
export class PairingsPageComponent {
  // canStartNextRound$: Observable<boolean>;
  filteredPairings$: Observable<Pairing[]>;
  hasTournamentStarted$: Observable<boolean>;
  hasSubmittedPairings$: Observable<boolean>;
  numberOfRounds$: Observable<number>;
  pairings$: Observable<Pairing[]>;
  pairingsExist$: Observable<boolean>;
  pairingsFilterText$: Observable<string>;
  playerEntities$: Observable<Dictionary<Player>>;
  roundIds$: Observable<number[] | string[]>;
  selectedPairingId$: Observable<number>;
  selectedRoundComplete$: Observable<boolean>;
  selectedRoundId$: Observable<number>;
  // selectedRoundHasPairings$: Observable<boolean>;

  constructor(
    // private pairingService: PairingService,
    // private playerService: PlayerService,
    // private roundService: RoundService,
    // private router: Router,
    // private standingsService: StandingsService,
    private store: Store<fromSwiss.State>
  ) {
    // this.canStartNextRound$ = this.roundService.canStartNextRound$;
    this.filteredPairings$ = this.store.pipe(
      select(fromSwiss.getSelectedRoundPairingsFiltered)
    );
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
    this.pairingsFilterText$ = this.store.pipe(
      select(fromSwiss.getPairingsFilterText)
    );
    this.playerEntities$ = this.store.pipe(
      select(fromSwiss.getPlayerEntities)
    );
    this.roundIds$ = this.store.pipe(
      select(fromSwiss.getRoundIds)
    );
    this.selectedPairingId$ = this.store.pipe(
      select(fromSwiss.getSelectedPairingId)
    );
    this.selectedRoundComplete$ = this.store.pipe(
      select(fromSwiss.getSelectedRoundComplete)
    );
    this.selectedRoundId$ = this.store.pipe(
      select(fromSwiss.getSelectedRoundId)
    );
  }

  // ngOnInit() {
  //   this.roundsSub = this.roundService.rounds$.subscribe((rounds: number[]) => {
  //     this.rounds = rounds;
  //     const selectedRound = Math.max(...rounds);
  //     this.pairingsForm.reset({
  //       currentRound: selectedRound
  //     });
  //     this.selectedRoundChanged(selectedRound);
  //   });
  // }

  // createNextRound(): void {
  //   // this.roundService.createNextRound();
  // }

  createPairings(round: number): void {
    this.store.dispatch(new PairingsPageActions.CreatePairings(round));
  }

  // generatePairings(): void {
    // const lastRound = this.roundService.getTotalNumberOfRounds();
    // this.pairingService.createPairings(this.selectedRound, this.selectedRound === lastRound);
  // }

  onLastResultSubmitted(): void {
    // this.roundService.markRoundAsComplete(this.selectedRound);
    // this.standingsService.calculateStandings();
    // this.router.navigate(['/swiss/standings']);
  }

  // onMatchResultsCleared(pairings: Pairing[]): void {
  //   this.pairingService.updatePairings(pairings);
  //   this.roundService.markRoundAsIncomplete(this.selectedRound);
  // }

  // onPlayerDroppedChanged(player: Player): void {
  //   this.playerService.updatePlayer(player);
  // }

  // onRedoMatchesForRound(): void {
  //   // this.pairingService.deletePairings(this.selectedRound);
  //   // this.roundService.markRoundAsIncomplete(this.selectedRound);
  // }

  redoMatches(roundId: number): void {
    this.store.dispatch(new PairingsPageActions.RedoMatches(roundId));
  }

  roundChanged(roundId: number): void {
    this.store.dispatch(new PairingsPageActions.ChangeSelectedRound(roundId));
  }

  selectPairing(table: number): void {
    this.store.dispatch(new PairingsPageActions.SelectPairing(table));
  }

  updateFilterText(filterText: string): void {
    this.store.dispatch(new PairingsPageActions.UpdatePairingsFilterText(filterText));
  }

  updateShowOutstandingOnly(showOutstandingOnly: boolean): void {
    this.store.dispatch(new PairingsPageActions.UpdateShowOutstandingOnly(showOutstandingOnly));
  }

  // onResultSubmitted(pairing: Pairing): void {
  //   this.pairingService.updatePairing(pairing);
  // }

  // private createForm(): void {
  //   this.pairingsForm = this.fb.group({
  //     currentRound: 1
  //   });

  //   this.pairingsForm.get('currentRound').valueChanges.subscribe((value: string) => {
  //     this.selectedRoundChanged(parseInt(value));
  //   });
  // }

  // private selectedRoundChanged(round: number): void {
  //   this.selectedRound = round;

  //   // this.pairings$ = this.pairingService.getPairingsForRound(this.selectedRound);
  //   this.selectedRoundHasPairings$ = this.pairings$.pipe(
  //     map(pairings => pairings.length > 0),
  //     distinctUntilChanged()
  //   );
  // }
}
