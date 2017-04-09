import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PairingsService, Player, PlayerService } from '../shared';

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
    private pairingsService: PairingsService,
    private playerService: PlayerService
  ) {}

  generatePairings() {
    this.pairingsService.createPairings(1, this.players).subscribe(() => {}, error => {
      // TODO Error handling.
      console.error(error);
    });
  }

  ngOnInit() {
    this.playerService.players.subscribe(players => this.players = players);
    this.createForm();
    this.pairingsService.get(this.pairingsForm.value.currentRound).subscribe(pairings => {
      this.activeRoundPairingsExist = pairings.length > 0;
    });
  }

  private createForm() {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });
  }
}
