import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mm-swiss-players-start',
  templateUrl: './swiss-players-start.component.html'
})
export class SwissPlayersStartComponent implements OnChanges {
  @Input() canBeginTournament: boolean;
  @Input() hasBegunTournament: boolean;
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

    if (this.hasBegunTournament) {
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
