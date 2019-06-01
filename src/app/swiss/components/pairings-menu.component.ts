import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mm-pairings-menu',
  templateUrl: './pairings-menu.component.html'
})
export class PairingsMenuComponent implements OnChanges, OnDestroy, OnInit {
  @Input() selectedRound: number;
  @Input() rounds: number[];
  @Output() createPairings = new EventEmitter<any>();
  @Output() roundChanged = new EventEmitter<number>();

  selectedRoundControl = new FormControl(1);

  private selectedRoundControlSub: Subscription;

  ngOnInit(): void {
    this.selectedRoundControlSub = this.selectedRoundControl.valueChanges.subscribe(round => {
      const roundInt = parseInt(round);
      this.roundChanged.emit(roundInt);
    });
  }

  ngOnChanges(): void {
    this.selectedRoundControl.setValue(this.selectedRound, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.selectedRoundControlSub.unsubscribe();
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
