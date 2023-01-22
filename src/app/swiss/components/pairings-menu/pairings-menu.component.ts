import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mm-pairings-menu',
  templateUrl: './pairings-menu.component.html',
})
export class PairingsMenuComponent implements OnChanges, OnDestroy {
  @Input() canStartNextRound: boolean = false;
  @Input() numberOfRounds: number = 0;
  @Input() pairingsExist: boolean = false;
  @Input() selectedRoundId: number | null = null;
  @Input() roundIds: number[] = [];
  @Output() changeSelectedRound = new EventEmitter<number>();
  @Output() createNextRound = new EventEmitter<void>();
  @Output() createPairings = new EventEmitter<number>();

  selectedRoundControl = new UntypedFormControl(1);

  private selectedRoundControlSub: Subscription;

  constructor() {
    this.selectedRoundControlSub =
      this.selectedRoundControl.valueChanges.subscribe((round) => {
        const roundInt = parseInt(round);
        this.changeSelectedRound.emit(roundInt);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRoundId']) {
      this.selectedRoundControl.setValue(this.selectedRoundId, {
        emitEvent: false,
      });
    }
  }

  ngOnDestroy(): void {
    this.selectedRoundControlSub.unsubscribe();
  }
}
