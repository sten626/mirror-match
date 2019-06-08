import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dictionary } from '@ngrx/entity';
import { matchResultValidator, Pairing, Player } from 'app/shared';

@Component({
  selector: 'mm-match-results',
  templateUrl: './match-results.component.html'
})
export class MatchResultsComponent implements OnChanges {
  @Input() playerEntities: Dictionary<Player>;
  @Input() selectedPairing: Pairing;
  @Output() clearMatchResult = new EventEmitter<Pairing>();
  // @Output() matchResultCleared = new EventEmitter<Pairing>();
  // @Output() playerDroppedChanged = new EventEmitter<Player>();
  // @Output() resultSubmitted = new EventEmitter<Pairing>();

  matchResultsForm: FormGroup = this.fb.group({
    player1Wins: 0,
    player2Wins: 0,
    draws: 0,
    player1Dropped: false,
    player2Dropped: false
  }, {
    validators: matchResultValidator
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    this.resetForm();
  }

  incrementDraws() {
    const draws = this.matchResultsForm.get('draws').value;

    if (draws < 9) {
      this.matchResultsForm.patchValue({draws: draws + 1});
    }
  }

  incrementPlayer1Wins() {
    const player1Wins = this.matchResultsForm.get('player1Wins').value;

    if (player1Wins < 2) {
      this.matchResultsForm.patchValue({player1Wins: player1Wins + 1});
    }
  }

  incrementPlayer2Wins() {
    const player2Wins = this.matchResultsForm.get('player2Wins').value;

    if (player2Wins < 2) {
      this.matchResultsForm.patchValue({player2Wins: player2Wins + 1});
    }
  }

  submit() {
    // const form = this.matchResultsForm;
    // this.selectedPairing.player1Wins = form.get('player1Wins').value;
    // this.selectedPairing.player2Wins = form.get('player2Wins').value;
    // this.selectedPairing.draws = form.get('draws').value;
    // this.selectedPairing.submitted = true;
    // const player1 = this.selectedPairing.player1;
    // const player2 = this.selectedPairing.player2;
    // const player1Dropped = form.get('player1Dropped').value;
    // const player2Dropped = form.get('player2Dropped').value;

    // if (player1.dropped !== player1Dropped) {
    //   player1.dropped = player1Dropped;
    //   this.playerDroppedChanged.emit(player1);
    // }

    // if (player2.dropped !== player2Dropped) {
    //   player2.dropped = player2Dropped;
    //   this.playerDroppedChanged.emit(player2);
    // }

    // this.resultSubmitted.emit(this.selectedPairing);
  }

  // private createForm() {
  //   this.matchResultsForm = this.fb.group({
  //     player1Wins: 0,
  //     player2Wins: 0,
  //     draws: 0,
  //     player1Dropped: false,
  //     player2Dropped: false
  //   });

  //   this.matchResultsForm.valueChanges.subscribe(() => this.onValueChanged());
  // }

  // private onValueChanged() {
  //   if (!this.matchResultsForm) {
  //     return;
  //   }

  //   const form = this.matchResultsForm;
  //   const player1Wins = form.get('player1Wins').value;
  //   const player2Wins = form.get('player2Wins').value;
  //   const draws = form.get('draws').value;
  //   const gamesPlayed = player1Wins + player2Wins + draws;
  // }

  private resetForm() {
    if (this.selectedPairing) {
      this.matchResultsForm.reset({
        player1Wins: this.selectedPairing.player1Wins,
        player2Wins: this.selectedPairing.player2Wins,
        draws: this.selectedPairing.draws
      });
    } else {
      this.matchResultsForm.reset({
        player1Wins: 0,
        player2Wins: 0,
        draws: 0
      });
    }
  }
}
