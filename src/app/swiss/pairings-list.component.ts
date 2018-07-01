import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  Pairing,
  PairingService,
  Player,
  RoundService
} from '../shared';

@Component({
  selector: 'mm-pairings-list',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list.component.html'
})
export class PairingsListComponent implements OnChanges, OnInit {
  @Input() pairings: Pairing[];
  @Input() selectedRound: number;
  @Output() clearMatchResultClicked = new EventEmitter<Pairing>();
  @Output() deleteResultsClicked = new EventEmitter<number>();
  @Output() pairingSubmitted = new EventEmitter<Pairing>();
  @Output() playerChanged = new EventEmitter<Player>();
  @Output() redoMatchesClicked = new EventEmitter<number>();

  filteredPairings: Pairing[];
  pairingsExist = false;
  pairingsListForm: FormGroup;
  selectedPairing: Pairing;
  selectedRoundComplete = false;
  selectedRoundHasSubmittedPairings = false;

  // private pairings: Pairing[];

  constructor(
    private fb: FormBuilder
    // private pairingService: PairingService,
    // private roundService: RoundService
  ) {}

  ngOnInit() {
    // Setup form.
    this.pairingsListForm = this.fb.group({
      pairingsSearch: '',
      showOutstandingOnly: true
    });

    // // Subscribe to services.
    // this.roundService.selectedRound.subscribe((round: number) => this.selectedRound = round);
    // this.roundService.pairingsForSelectedRound.subscribe((pairings: Pairing[]) => {
    //   this.pairings = pairings;
    //   this.filterPairings();
    // });
    // this.pairingService.selectedPairing.subscribe((pairing: Pairing) => {
    //   this.selectedPairing = pairing;
    //   this.filterPairings();
    // });

    // this.roundService.selectedRoundHasPairings.subscribe((hasPairings: boolean) => this.pairingsExist = hasPairings);
    // this.roundService.selectedRoundHasSubmittedPairings.subscribe((hasSubmitted: boolean) => {
    //   this.selectedRoundHasSubmittedPairings = hasSubmitted;
    // });

    // this.roundService.selectedRoundComplete.subscribe((roundComplete: boolean) => this.selectedRoundComplete = roundComplete);

    // Filter pairings.
    this.pairingsListForm.valueChanges.subscribe(() => this.filterPairings());
    this.filterPairings();
  }

  ngOnChanges() {
    this.pairingsExist = this.pairings.length > 0;
    let selectedRoundComplete = true;
    let selectedRoundHasSubmittedPairings = false;

    if (this.pairingsExist) {
      for (const pairing of this.pairings) {
        if (pairing.submitted) {
          selectedRoundHasSubmittedPairings = true;
        } else {
          selectedRoundComplete = false;
        }

        if (!selectedRoundComplete && selectedRoundHasSubmittedPairings) {
          break;
        }
      }
    } else {
      selectedRoundComplete = false;
    }

    this.selectedRoundComplete = selectedRoundComplete;
    this.selectedRoundHasSubmittedPairings = selectedRoundHasSubmittedPairings;
    this.filterPairings();
  }

  clearMatchResult(pairing: Pairing): void {
    this.clearMatchResultClicked.emit(pairing);
    this.selectedPairing = null;
  }

  deleteResults() {
    this.deleteResultsClicked.emit(this.selectedRound);
    // this.roundService.markRoundAsIncomplete(this.selectedRound);
  }

  onPlayerChanged(player: Player) {
    this.playerChanged.emit(player);
  }

  onSubmitPairing(pairing: Pairing) {
    this.pairingSubmitted.emit(pairing);
    this.selectedPairing = null;
  }

  redoMatches() {
    this.redoMatchesClicked.emit(this.selectedRound);
    this.selectedPairing = null;
    // this.pairingService.deletePairings(this.selectedRound);
    // this.roundService.markRoundAsIncomplete(this.selectedRound);
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
    this.selectedPairing = pairing;
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
