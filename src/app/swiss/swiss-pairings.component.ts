import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {
  PairingService,
  Player,
  // PlayerService,
  RoundService
} from '../shared';

@Component({
  templateUrl: './swiss-pairings.component.html'
})
export class SwissPairingsComponent implements OnInit {
  canStartNextRound = false;
  rounds: Observable<number[]>;
  pairingsForm: FormGroup;
  players: Player[];
  selectedRound: number;
  selectedRoundHasPairings = false;

  constructor(
    private fb: FormBuilder,
    private pairingService: PairingService,
    private roundService: RoundService
  ) {}

  createNextRound(): void {
    this.roundService.createNextRound();
  }

  generatePairings(): void {
    const lastRound = this.roundService.getTotalNumberOfRounds();
    this.pairingService.createPairings(this.selectedRound, this.selectedRound === lastRound);
  }

  ngOnInit() {
    this.rounds = this.roundService.rounds;
    this.createForm();
    this.roundService.selectedRound.subscribe((round: number) => {
      if (round !== this.selectedRound) {
        this.selectedRound = round;
        this.pairingsForm.reset({
          currentRound: this.selectedRound
        });
      }
    });
    this.roundService.selectedRoundHasPairings.subscribe((hasPairings: boolean) => this.selectedRoundHasPairings = hasPairings);
    this.roundService.canStartNextRound.subscribe((canStart: boolean) => this.canStartNextRound = canStart);
  }

  private createForm(): void {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });

    this.pairingsForm.get('currentRound').valueChanges.subscribe((value: string) => {
      this.roundService.setSelectedRound(parseInt(value));
    });
  }
}
