import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Pairing, Player } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  templateUrl: './pairings-page.component.html'
})
export class PairingsPageComponent implements OnDestroy, OnInit {
  canStartNextRound$: Observable<boolean>;
  hasTournamentStarted$: Observable<boolean>;
  rounds: number[];
  pairings$: Observable<Pairing[]>;
  pairingsForm: FormGroup;
  players: Player[];
  selectedRound = 1;
  selectedRoundHasPairings$: Observable<boolean>;

  private currentRoundSub: Subscription;

  constructor(
    private fb: FormBuilder,
    // private pairingService: PairingService,
    // private playerService: PlayerService,
    // private roundService: RoundService,
    private router: Router,
    // private standingsService: StandingsService,
    private store: Store<fromSwiss.State>
  ) {
    // this.canStartNextRound$ = this.roundService.canStartNextRound$;
    this.hasTournamentStarted$ = this.store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
    this.createForm();
  }

  ngOnInit() {
    this.currentRoundSub = this.store.pipe(
      select(fromSwiss.getCurrentRound)
    ).subscribe((currentRound) => {
      const rounds = [];
      let i = 1;

      while (i <= currentRound) {
        rounds.push(i++);
      }

      this.rounds = rounds;
    });
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
  ngOnDestroy() {
    this.currentRoundSub.unsubscribe();
  }

  createNextRound(): void {
    // this.roundService.createNextRound();
  }

  generatePairings(): void {
    // const lastRound = this.roundService.getTotalNumberOfRounds();
    // this.pairingService.createPairings(this.selectedRound, this.selectedRound === lastRound);
  }

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

  // onResultSubmitted(pairing: Pairing): void {
  //   this.pairingService.updatePairing(pairing);
  // }

  private createForm(): void {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });

    this.pairingsForm.get('currentRound').valueChanges.subscribe((value: string) => {
      this.selectedRoundChanged(parseInt(value));
    });
  }

  private selectedRoundChanged(round: number): void {
    this.selectedRound = round;

    // this.pairings$ = this.pairingService.getPairingsForRound(this.selectedRound);
    this.selectedRoundHasPairings$ = this.pairings$.pipe(
      map(pairings => pairings.length > 0),
      distinctUntilChanged()
    );
  }
}
