import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Pairing, Player } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PairingsPageActions } from '../actions';

@Component({
  templateUrl: './pairings-page.component.html'
})
export class PairingsPageComponent {
  canStartNextRound$: Observable<boolean>;
  hasTournamentStarted$: Observable<boolean>;
  numberOfRounds$: Observable<number>;
  pairingsForSelectedRound$: Observable<Pairing[]>;
  // pairings$: Observable<Pairing[]>;
  players: Player[];
  rounds$: Observable<number[] | string[]>;
  selectedRound$: Observable<number>;
  selectedRoundHasPairings$: Observable<boolean>;

  constructor(
    // private pairingService: PairingService,
    // private playerService: PlayerService,
    // private roundService: RoundService,
    // private router: Router,
    // private standingsService: StandingsService,
    private store: Store<fromSwiss.State>
  ) {
    // this.canStartNextRound$ = this.roundService.canStartNextRound$;
    this.hasTournamentStarted$ = this.store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
    this.numberOfRounds$ = this.store.pipe(
      select(fromSwiss.getNumberOfRounds)
    );
    this.pairingsForSelectedRound$ = this.store.pipe(

    );
    this.rounds$ = this.store.pipe(
      select(fromSwiss.getRoundIds)
    );
    this.selectedRound$ = this.store.pipe(
      select(fromSwiss.getSelectedRound)
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

  onRedoMatchesForRound(): void {
    // this.pairingService.deletePairings(this.selectedRound);
    // this.roundService.markRoundAsIncomplete(this.selectedRound);
  }

  roundChanged(round: number): void {
    this.store.dispatch(new PairingsPageActions.ChangeSelectedRound(round));
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
