import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PairingsService, Player, PlayerService } from '../shared';

@Component({
  templateUrl: './swiss-pairings.component.html'
})
export class SwissPairingsComponent implements OnInit {
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
    this.playerService.getAll().subscribe(players => this.players = players);
    this.createForm();
  }

  private createForm() {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });
  }
}
