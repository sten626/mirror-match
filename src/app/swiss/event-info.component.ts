import { Component, OnInit } from '@angular/core';

import { Pairing, RoundService } from '../shared';

@Component({
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent implements OnInit {
  completedRound: string;
  currentRound = 1;
  numberOfRounds = 0;
  ongoingMatches = 0;
  showEndEventConfirmation = false;

  constructor(private roundService: RoundService) {}

  ngOnInit(): void {
    this.numberOfRounds = this.roundService.getTotalNumberOfRounds();
    this.roundService.currentRound.subscribe((currentRound: number) => this.currentRound = currentRound);
    this.roundService.completedRounds.subscribe((completedRounds: number[]) => {
      if (completedRounds.length > 0) {
        this.completedRound = completedRounds[completedRounds.length - 1].toString();
      } else {
        this.completedRound = 'None';
      }
    });
    this.roundService.outstandingPairingsForCurrentRound.subscribe((pairings: Pairing[]) => this.ongoingMatches = pairings.length);
  }

  cancelEndEvent(): void {
    this.showEndEventConfirmation = false;
  }

  endEventClicked(): void {
    this.showEndEventConfirmation = true;
  }
}
