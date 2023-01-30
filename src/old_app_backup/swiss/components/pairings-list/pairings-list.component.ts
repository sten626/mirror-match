import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pairing, Player } from '@mm/shared/models';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'mm-pairings-list',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list.component.html',
})
export class PairingsListComponent {
  @Input() hasSubmittedPairings: boolean = false;
  @Input() pairings: Pairing[] = [];
  @Input() pairingsExist: boolean = false;
  @Input() playerEntities!: Dictionary<Player>;
  @Input() selectedPairing!: Pairing | null;
  @Input() selectedRoundComplete: boolean = false;
  @Input() selectedRoundId: number | null = null;
  @Output() deleteResults = new EventEmitter<Pairing[]>();
  @Output() redoMatches = new EventEmitter<number>();
  @Output() selectPairing = new EventEmitter<Pairing>();

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

  playerName(playerId: number | null): string {
    if (playerId) {
      return this.playerEntities[playerId]!.name;
    } else {
      return '***Bye***';
    }
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
}
