import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mm-pairings-menu',
  templateUrl: './pairings-menu.component.html',
})
export class PairingsMenuComponent implements OnChanges, OnDestroy, OnInit {
  @Input() canStartNextRound: boolean;
  @Input() numberOfRounds: number;
  @Input() pairingsExist: boolean;
  @Input() selectedRoundId: number;
  @Input() roundIds: number[];
  @Output() changeSelectedRound = new EventEmitter<number>();
  @Output() createNextRound = new EventEmitter<void>();
  @Output() createPairings = new EventEmitter<number>();

  selectedRoundControl = new FormControl(1);

  private selectedRoundControlSub: Subscription;

  ngOnInit(): void {
    this.selectedRoundControlSub =
      this.selectedRoundControl.valueChanges.subscribe((round) => {
        const roundInt = parseInt(round);
        this.changeSelectedRound.emit(roundInt);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedRoundId) {
      this.selectedRoundControl.setValue(this.selectedRoundId, {
        emitEvent: false,
      });
    }
  }

  ngOnDestroy(): void {
    this.selectedRoundControlSub.unsubscribe();
  }
}
