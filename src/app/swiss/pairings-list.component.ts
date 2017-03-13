import { Component, Input, OnChanges } from '@angular/core';

import { Pairing, PairingsService } from '../shared';

@Component({
  selector: 'mm-pairings-list',
  templateUrl: './pairings-list.component.html'
})
export class PairingsListComponent implements OnChanges {
  @Input() roundNumber: number;

  activePairing: Pairing;
  pairings: Pairing[] = [];

  constructor(private pairingsService: PairingsService) {}

  ngOnChanges() {
    this.pairingsService.get(this.roundNumber).subscribe(pairings => {
      this.pairings = pairings;
    });
  }

  onSubmit() {
    this.pairingsService.saveForRound(this.roundNumber, this.pairings).subscribe(() => {
      this.activePairing = null;
    });
  }

  resultDisplayString(pairing: Pairing, invert = false): string {
    if (pairing.player1Wins || pairing.player2Wins || pairing.draws) {
      if (invert) {
        return `${pairing.player2Wins}/${pairing.player1Wins}/${pairing.draws}`;
      }

      return `${pairing.player1Wins}/${pairing.player2Wins}/${pairing.draws}`;
    }

    return 'Awaiting Result';
  }

  selectPairing(pairing: Pairing) {
    this.activePairing = pairing;
  }
}
