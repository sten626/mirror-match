import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'mm-start-form',
  templateUrl: './start-form.component.html',
})
export class StartFormComponent implements OnChanges {
  @Input() canBeginTournament: boolean = false;
  @Input() hasTournamentStarted: boolean = false;
  @Input() recommendedNumberOfRounds: number = 3;
  @Output() startTournament = new EventEmitter<number>();

  swissPlayersStartForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.swissPlayersStartForm = this.fb.group({
      numberOfRounds: 3,
    });
  }

  ngOnChanges() {
    this.swissPlayersStartForm.reset({
      numberOfRounds: this.recommendedNumberOfRounds,
    });

    if (this.hasTournamentStarted) {
      this.swissPlayersStartForm.disable();
    } else {
      this.swissPlayersStartForm.enable();
    }
  }

  onSubmit() {
    const numOfRounds = this.swissPlayersStartForm.get('numberOfRounds')!.value;
    this.startTournament.emit(numOfRounds);
  }
}
