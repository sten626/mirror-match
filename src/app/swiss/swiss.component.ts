import { Component, OnInit } from '@angular/core';

import { RoundService } from '../shared';

@Component({
  templateUrl: './swiss.component.html'
})
export class SwissComponent implements OnInit {
  hasCompletedRounds = false;
  hasTournamentBegun = false;

  constructor(private roundService: RoundService) {}

  ngOnInit() {
    this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => this.hasTournamentBegun = hasBegun);
    this.roundService.hasCompletedRounds.subscribe((hasCompletedRounds: boolean) => this.hasCompletedRounds = hasCompletedRounds);
  }
}
