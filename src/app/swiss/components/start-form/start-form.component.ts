import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mm-start-form',
  templateUrl: './start-form.component.html'
})
export class StartFormComponent implements OnChanges {
  @Input() canBeginTournament: boolean;
  @Input() hasTournamentStarted: boolean;
  @Input() recommendedNumberOfRounds: number;
  @Output() startTournament = new EventEmitter<number>();

  swissPlayersStartForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges() {
    this.swissPlayersStartForm.reset({
      numberOfRounds: this.recommendedNumberOfRounds
    });

    if (this.hasTournamentStarted) {
      this.swissPlayersStartForm.disable();
    } else {
      this.swissPlayersStartForm.enable();
    }
  }

  onSubmit() {
    const numOfRounds = this.swissPlayersStartForm.get('numberOfRounds').value;
    this.startTournament.emit(numOfRounds);
  }

  private createForm() {
    this.swissPlayersStartForm = this.fb.group({
      numberOfRounds: 3
    });
  }
}
