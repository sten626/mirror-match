import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mm-round-selection',
  templateUrl: './round-selection.component.html'
})
export class RoundSelectionComponent {
  @Input() rounds: number[];
  @Input() selectedRound: number;
  @Output() createPairingsClicked = new EventEmitter<number>();
  @Output() selectedRoundChanged = new EventEmitter<number>();

  createPairings(): void {
    this.createPairingsClicked.emit(this.selectedRound);
  }

  onRoundChange(selectedRound: number): void {
    this.selectedRoundChanged.emit(selectedRound);
  }
}
