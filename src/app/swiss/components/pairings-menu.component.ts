import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mm-pairings-menu',
  templateUrl: './pairings-menu.component.html'
})
export class PairingsMenuComponent implements OnChanges {
  @Input() rounds: number[];
  @Output() createPairings = new EventEmitter<any>();

  currentRound = new FormControl(1);

  ngOnChanges(changes: SimpleChanges): void {
    const rounds: number[] = changes.rounds.currentValue;
    const roundToSelect = rounds[rounds.length - 1];
    this.currentRound.setValue(roundToSelect);
  }

  // pairingsForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.createForm();
  // }

  // private createForm(): void {
  //   this.pairingsForm = this.fb.group({
  //     currentRound: 1
  //   });

  //   // this.pairingsForm.get('currentRound').valueChanges.subscribe((value: string) => {
  //   //   this.selectedRoundChanged(parseInt(value));
  //   // });
  // }
}
