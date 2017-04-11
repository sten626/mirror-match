import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  PairingService,
  Player,
  PlayerService
} from '../shared';

@Component({
  templateUrl: './swiss-pairings.component.html'
})
export class SwissPairingsComponent implements OnInit {
  activeRoundPairingsExist = false;
  rounds: number[] = [1];
  pairingsForm: FormGroup;
  players: Player[];

  constructor(
    private fb: FormBuilder,
    private pairingService: PairingService,
    private playerService: PlayerService
  ) {}

  generatePairings() {
    this.pairingService.createPairings(1, this.players).subscribe(() => {}, error => {
      // TODO Error handling.
      console.error(error);
    });
  }

  ngOnInit() {
    this.playerService.players.subscribe(players => this.players = players);
    this.createForm();
    this.pairingService.get(this.pairingsForm.value.currentRound).subscribe(pairings => {
      this.activeRoundPairingsExist = pairings.length > 0;
    });
  }

  private createForm() {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });
  }
}
