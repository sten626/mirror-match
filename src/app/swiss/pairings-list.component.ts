import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Pairing, PairingsService } from '../shared';

@Component({
  selector: 'mm-pairings-list',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list.component.html'
})
export class PairingsListComponent implements OnChanges, OnInit {
  @Input() roundNumber: number;

  activePairing: Pairing;
  pairings: Pairing[] = [];
  pairingsListForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pairingsService: PairingsService
  ) {}

  deleteResults() {
    this.pairings.forEach(pairing => {
      pairing.player1Wins = 0;
      pairing.player2Wins = 0;
      pairing.draws = 0;
      pairing.submitted = false;
    });

    this.pairingsService.saveForRound(this.roundNumber, this.pairings).subscribe();
  }

  ngOnChanges() {
    this.pairingsService.get(this.roundNumber).subscribe(pairings => {
      this.pairings = pairings;
    });
  }

  ngOnInit() {
    this.pairingsListForm = this.fb.group({
      showOutstandingOnly: true
    });
  }

  onClearResult() {
    this.pairingsService.saveForRound(this.roundNumber, this.pairings).subscribe();
  }

  onSubmit() {
    this.pairingsService.saveForRound(this.roundNumber, this.pairings).subscribe(() => {
      this.activePairing = null;
    });
  }

  redoMatches() {
    this.pairingsService.deletePairings(this.roundNumber).subscribe();
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
