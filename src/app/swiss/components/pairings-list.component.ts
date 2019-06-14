import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Pairing, Player } from 'app/shared';

@Component({
  selector: 'mm-pairings-list',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list.component.html'
})
export class PairingsListComponent {
  @Input() hasSubmittedPairings: boolean;
  @Input() pairings: Pairing[];
  @Input() pairingsExist: boolean;
  @Input() playerEntities: Dictionary<Player>;
  @Input() selectedPairingId: number;
  @Input() selectedRoundComplete: boolean;
  @Input() selectedRoundId: number;
  @Output() deleteResults = new EventEmitter<Pairing[]>();
  @Output() redoMatches = new EventEmitter<number>();
  @Output() selectPairing = new EventEmitter<number>();

  filterText = '';
  showOutstandingOnly = true;
  // @Output() lastResultSubmitted = new EventEmitter<string>();
  // @Output() matchResultsCleared = new EventEmitter<Pairing[]>();
  // @Output() playerDroppedChanged = new EventEmitter<Player>();
  // @Output() redoMatchesForRound = new EventEmitter<string>();
  // @Output() resultSubmitted = new EventEmitter<Pairing>();

  // deleteResults() {
  //   // this.pairings.forEach(pairing => {
  //   //   if (!pairing.bye) {
  //   //     pairing.player1Wins = 0;
  //   //     pairing.player2Wins = 0;
  //   //     pairing.draws = 0;
  //   //     pairing.submitted = false;
  //   //   }
  //   // });

  //   // this.matchResultsCleared.emit(this.pairings);
  //   // this.selectedPairing = null;
  // }

  // onMatchResultCleared(pairing: Pairing): void {
  //   this.matchResultsCleared.emit([pairing]);
  //   this.selectedPairing = null;
  // }

  // onPlayerDroppedChanged(player: Player): void {
  //   this.playerDroppedChanged.emit(player);
  // }

  // onResultSubmitted(pairing: Pairing): void {
  //   this.resultSubmitted.emit(pairing);
  //   this.selectedPairing = null;
  //   const numUnsubmitted = this.pairings.filter((p: Pairing) => !p.submitted).length;

  //   if (numUnsubmitted === 0) {
  //     this.lastResultSubmitted.emit();
  //   }
  // }

  filterTextChanged(filterText: string) {
    this.filterText = filterText;
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

  showOutstandingOnlyChanged(showOutstandingOnly: boolean) {
    this.showOutstandingOnly = showOutstandingOnly;
  }

  // private filterPairings() {
  //   // if (!this.pairingsListForm) {
  //   //   return;
  //   // }

  //   // if (this.pairingsListForm.get('showOutstandingOnly').value) {
  //   //   this.filteredPairings = this.pairings.filter(pairing => !pairing.submitted);
  //   // } else {
  //   //   this.filteredPairings = this.pairings.slice();
  //   // }

  //   // const filterText = this.pairingsListForm.get('pairingsSearch').value.trim().toLowerCase();

  //   // if (filterText) {
  //   //   this.filteredPairings = this.filteredPairings.filter(pairing => {
  //   //     return pairing.table.toString() === filterText
  //   //         || pairing.player1.name.toLowerCase().includes(filterText)
  //   //         || pairing.player2.name.toLowerCase().includes(filterText);
  //   //   });
  //   // }
  // }
}
