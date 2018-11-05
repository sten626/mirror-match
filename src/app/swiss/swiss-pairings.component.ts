import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  Pairing,
  PairingService,
  Player,
  PlayerService,
  RoundService,
  StandingsService
} from '../shared';

@Component({
  templateUrl: './swiss-pairings.component.html'
})
export class SwissPairingsComponent implements OnDestroy, OnInit {
  canStartNextRound$: Observable<boolean>;
  rounds: number[];
  pairings$: Observable<Pairing[]>;
  pairingsForm: FormGroup;
  players: Player[];
  selectedRound = 1;
  selectedRoundHasPairings$: Observable<boolean>;

  private roundsSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private pairingService: PairingService,
    private playerService: PlayerService,
    private roundService: RoundService,
    private router: Router,
    private standingsService: StandingsService
  ) {
    this.canStartNextRound$ = this.roundService.canStartNextRound$;
    this.createForm();
  }

  ngOnInit() {
    this.roundsSub = this.roundService.rounds$.subscribe((rounds: number[]) => {
      this.rounds = rounds;
      const selectedRound = Math.max(...rounds);
      this.pairingsForm.reset({
        currentRound: selectedRound
      });
      this.selectedRoundChanged(selectedRound);
    });
  }

  ngOnDestroy() {
    this.roundsSub.unsubscribe();
  }

  createNextRound(): void {
    this.roundService.createNextRound();
  }

  generatePairings(): void {
    const lastRound = this.roundService.getTotalNumberOfRounds();
    this.pairingService.createPairings(this.selectedRound, this.selectedRound === lastRound);
  }

  onLastResultSubmitted(): void {
    this.roundService.markRoundAsComplete(this.selectedRound);
    this.standingsService.calculateStandings();
    this.router.navigate(['/swiss/standings']);
  }

  onMatchResultsCleared(pairings: Pairing[]): void {
    this.pairingService.updatePairings(pairings);
    this.roundService.markRoundAsIncomplete(this.selectedRound);
  }

  onPlayerDroppedChanged(player: Player): void {
    this.playerService.updatePlayer(player);
  }

  onRedoMatchesForRound(): void {
    this.pairingService.deletePairings(this.selectedRound);
    this.roundService.markRoundAsIncomplete(this.selectedRound);
  }

  onResultSubmitted(pairing: Pairing): void {
    // this.pairingService.saveAndClearSelected();
    this.pairingService.updatePairing(pairing);
  }

  private createForm(): void {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });

    this.pairingsForm.get('currentRound').valueChanges.subscribe((value: string) => {
      this.selectedRound = parseInt(value);
    });
  }

  private selectedRoundChanged(round: number): void {
    this.selectedRound = round;

    this.pairings$ = this.pairingService.getPairingsForRound(this.selectedRound);
    this.selectedRoundHasPairings$ = this.pairings$.pipe(
      map(pairings => pairings.length > 0),
      distinctUntilChanged()
    );
  }
}
