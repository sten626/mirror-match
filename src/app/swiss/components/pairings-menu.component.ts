import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mm-pairings-menu',
  templateUrl: './pairings-menu.component.html'
})
export class PairingsMenuComponent implements OnChanges, OnDestroy, OnInit {
  @Input() numberOfRounds: number;
  @Input() selectedRoundId: number;
  @Input() roundIds: number[];
  @Output() createPairings = new EventEmitter<number>();
  @Output() roundChanged = new EventEmitter<number>();

  selectedRoundControl = new FormControl(1);

  private selectedRoundControlSub: Subscription;

  ngOnInit(): void {
    this.selectedRoundControlSub = this.selectedRoundControl.valueChanges.subscribe(round => {
      const roundInt = parseInt(round);
      this.roundChanged.emit(roundInt);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedRoundId) {
      this.selectedRoundControl.setValue(this.selectedRoundId, { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.selectedRoundControlSub.unsubscribe();
  }

  createPairingsClicked() {
    this.createPairings.emit(this.selectedRoundId);
  }
}
