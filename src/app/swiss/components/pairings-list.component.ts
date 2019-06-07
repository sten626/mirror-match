import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dictionary } from '@ngrx/entity';
import { Pairing, Player } from 'app/shared';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'mm-pairings-list',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list.component.html'
})
export class PairingsListComponent implements OnChanges, OnDestroy, OnInit {
  @Input() filteredPairings: Pairing[];
  @Input() filterText: string;
  @Input() hasSubmittedPairings: boolean;
  @Input() pairingsExist: boolean;
  @Input() playerEntities: Dictionary<Player>;
  @Input() selectedRoundComplete: boolean;
  @Input() selectedRoundId: number;
  @Output() filterTextChanged = new EventEmitter<string>();
  @Output() redoMatches = new EventEmitter<number>();
  @Output() showOutstandingOnlyChanged = new EventEmitter<boolean>();
  // @Output() lastResultSubmitted = new EventEmitter<string>();
  // @Output() matchResultsCleared = new EventEmitter<Pairing[]>();
  // @Output() playerDroppedChanged = new EventEmitter<Player>();
  // @Output() redoMatchesForRound = new EventEmitter<string>();
  // @Output() resultSubmitted = new EventEmitter<Pairing>();

  filterText$: Observable<string>;
  filterTextSub: Subscription;
  pairingsListForm: FormGroup = new FormGroup({
    filterText: new FormControl(''),
    showOutstandingOnly: new FormControl(true)
  });
  showOutstandingOnlySub: Subscription;

  ngOnInit() {
    this.filterText$ = this.pairingsListForm.get('filterText').valueChanges.pipe(
      debounceTime(10),
      map(filterText => filterText.trim().toLowerCase()),
      distinctUntilChanged()
    );
    this.filterTextSub = this.filterText$.subscribe(filterText => this.filterTextChanged.emit(filterText));
    this.showOutstandingOnlySub = this.pairingsListForm.get('showOutstandingOnly').valueChanges.subscribe(
      showOutstandingOnly => this.showOutstandingOnlyChanged.emit(showOutstandingOnly)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterText) {
      this.pairingsListForm.get('filterText').setValue(changes.filterText.currentValue, {
        emitEvent: false
      });
    }
    // if (this.pairings) {
    //   if (this.pairings.length === 0) {
    //     this.pairingsExist = false;
    //     this.selectedRoundComplete = false;
    //     this.selectedRoundHasSubmittedPairings = false;
    //   } else {
    //     this.filterPairings();
    //     this.pairingsExist = true;
    //     this.selectedRoundComplete = this.pairings
    //       .map(p => p.submitted)
    //       .reduce((prevSubmitted, curSubmitted) => prevSubmitted && curSubmitted);

    //     // this.selectedRoundHasSubmittedPairings = this.pairings.filter(p => p.submitted && !p.bye).length > 0;
    //   }
    // }
  }

  ngOnDestroy() {
    this.filterTextSub.unsubscribe();
  }

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
    pairing = pairing;
    // if (!pairing.bye) {
    //   this.selectedPairing = pairing;
    // }
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
