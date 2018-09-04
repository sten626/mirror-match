import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  Pairing,
  PairingService,
  Player,
  RoundService
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
    private roundService: RoundService
  ) {
    this.canStartNextRound$ = this.roundService.canStartNextRound$;
    this.createForm();
  }

  ngOnInit() {
    this.roundsSub = this.roundService.rounds$.subscribe((rounds: number[]) => {
      this.rounds = rounds;
      this.selectedRound = Math.max(...rounds);
      this.pairingsForm.reset({
        currentRound: this.selectedRound
      });
      this.pairings$ = this.pairingService.getPairingsForRound(this.selectedRound);
      this.selectedRoundHasPairings$ = this.pairings$.pipe(
        map(pairings => pairings.length > 0),
        distinctUntilChanged()
      );
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

  private createForm(): void {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });

    this.pairingsForm.get('currentRound').valueChanges.subscribe((value: string) => {
      this.selectedRound = parseInt(value);
    });
  }
}
