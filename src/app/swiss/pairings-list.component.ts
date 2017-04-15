import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  Pairing,
  PairingService,
  RoundService
} from '../shared';

@Component({
  selector: 'mm-pairings-list',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list.component.html'
})
export class PairingsListComponent implements OnChanges, OnInit {
  // @Input() roundNumber: number;

  // activePairing: Pairing;
  filteredPairings: Pairing[];
  pairingsExist = false;
  pairingsListForm: FormGroup;
  selectedRound: number;

  private pairings: Pairing[];

  constructor(
    private fb: FormBuilder,
    private pairingService: PairingService,
    private roundService: RoundService
  ) {}

  deleteResults() {
    // this.pairings.forEach(pairing => {
    //   pairing.player1Wins = 0;
    //   pairing.player2Wins = 0;
    //   pairing.draws = 0;
    //   pairing.submitted = false;
    // });

    // this.pairingService.saveForRound(this.roundNumber, this.pairings).subscribe();
  }

  ngOnChanges() {
    // this.pairingService.get(this.roundNumber).subscribe(pairings => {
    //   this.pairings = pairings;
    //   this.filterPairings();
    // });
  }

  ngOnInit() {
    // Setup form.
    this.pairingsListForm = this.fb.group({
      pairingsSearch: '',
      showOutstandingOnly: true
    });

    // Subscribe to services.
    this.roundService.selectedRound.subscribe((round: number) => this.selectedRound = round);
    this.roundService.pairingsForSelectedRound.subscribe((pairings: Pairing[]) => {
      this.pairings = pairings;
      this.filterPairings();
    });

    this.roundService.selectedRoundHasPairings.subscribe((hasPairings: boolean) => this.pairingsExist = hasPairings);

    // Filter pairings.
    this.pairingsListForm.valueChanges.subscribe(() => this.filterPairings());
  }

  onClearResult() {
    // this.pairingService.saveForRound(this.roundNumber, this.pairings).subscribe();
  }

  onSubmit() {
    // this.pairingService.saveForRound(this.roundNumber, this.pairings).subscribe(() => {
    //   this.activePairing = null;
    // });
  }

  redoMatches() {
    this.pairingService.deletePairings(this.selectedRound);
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
    this.pairingService.setSelectedPairing(pairing);
  }

  private filterPairings() {
    if (!this.pairingsListForm) {
      return;
    }

    if (this.pairingsListForm.get('showOutstandingOnly').value) {
      this.filteredPairings = this.pairings.filter(pairing => !pairing.submitted);
    } else {
      this.filteredPairings = this.pairings.slice();
    }

    const filterText = this.pairingsListForm.get('pairingsSearch').value.trim().toLowerCase();

    if (filterText) {
      this.filteredPairings = this.filteredPairings.filter(pairing => {
        return pairing.table.toString() === filterText
            || pairing.player1.name.toLowerCase().includes(filterText)
            || pairing.player2.name.toLowerCase().includes(filterText);
      });
    }
  }
}
