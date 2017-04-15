import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

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
  filteredPairings: Observable<Pairing[]>;
  pairingsListForm: FormGroup;

  private pairings: Observable<Pairing[]>;

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
    this.pairingsListForm = this.fb.group({
      pairingsSearch: '',
      showOutstandingOnly: true
    });

    this.pairings = this.roundService.pairingsForSelectedRound;
    this.filteredPairings = this.pairings.combineLatest(this.pairingsListForm.valueChanges, (pairings: Pairing[]) => {
      const showOutstandingOnly = this.pairingsListForm.get('showOutstandingOnly').value;
      const filterText = this.pairingsListForm.get('pairingsSearch').value.trim();

      return pairings.filter((pairing: Pairing) => {
        if (showOutstandingOnly && pairing.submitted) {
          return false;
        }

        if (filterText) {
          return pairing.table === filterText || pairing.player1.name.includes(filterText) || pairing.player2.name.includes(filterText);
        }

        return true;
      });
    });
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
    // this.pairingService.deletePairings(this.roundNumber).subscribe();
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
}
