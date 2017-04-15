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

  generatePairings() {
    this.pairingService.createPairings();
  }

  ngOnInit() {
    this.rounds = this.roundService.rounds;
    this.createForm();
    this.roundService.selectedRound.subscribe((round: number) => {
      this.selectedRound = round;
      this.pairingsForm.reset({
        currentRound: this.selectedRound
      });
    });
    this.roundService.selectedRoundHasPairings.subscribe((hasPairings: boolean) => this.selectedRoundHasPairings = hasPairings);
  }

  private createForm() {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });
  }
}
