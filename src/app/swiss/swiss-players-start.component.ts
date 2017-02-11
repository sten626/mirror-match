import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mm-swiss-players-start',
  templateUrl: './swiss-players-start.component.html'
})
export class SwissPlayersStartComponent implements OnChanges, OnInit {
  @Input() numPlayers: number;
  @Input() numRounds: number;
  @Output() beginEvent = new EventEmitter<number>();

  swissPlayersStartForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  canBeginEvent(): boolean {
    return this.swissPlayersStartForm.valid && this.numPlayers >= 4;
  }

  ngOnChanges() {
    if (this.swissPlayersStartForm) {
      this.swissPlayersStartForm.reset({
        numberOfRounds: this.numRounds
      });
    }
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.beginEvent.emit(this.numRounds);
  }

  private createForm() {
    this.swissPlayersStartForm = this.fb.group({
      numberOfRounds: this.numRounds
    });
  }
}
