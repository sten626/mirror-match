import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Pairing } from '../shared';

@Component({
  selector: 'mm-match-results',
  templateUrl: './match-results.component.html'
})
export class MatchResultsComponent implements OnChanges, OnInit {
  @Input() activePairing: Pairing;
  @Output() onSubmit = new EventEmitter();

  matchResultsForm: FormGroup;
  resultValid: boolean;

  constructor(private fb: FormBuilder) {}

  incrementDraws() {
    const draws = this.matchResultsForm.get('draws').value;

    if (draws < 3) {
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

  ngOnChanges() {
    if (!this.matchResultsForm || !this.activePairing) {
      return;
    }

    this.matchResultsForm.reset({
      player1Wins: this.activePairing.player1Wins,
      player2Wins: this.activePairing.player2Wins,
      draws: this.activePairing.draws
    });
  }

  ngOnInit() {
    this.createForm();
  }

  submit() {
    const form = this.matchResultsForm;
    this.activePairing.player1Wins = form.get('player1Wins').value;
    this.activePairing.player2Wins = form.get('player2Wins').value;
    this.activePairing.draws = form.get('draws').value;
    this.activePairing.submitted = true;
    this.onSubmit.emit();
  }

  private createForm() {
    this.matchResultsForm = this.fb.group({
      player1Wins: 0,
      player2Wins: 0,
      draws: 0,
      player1Dropped: false,
      player2Dropped: false
    });

    this.resultValid = false;
    this.matchResultsForm.valueChanges.subscribe(() => this.onValueChanged());
  }

  private onValueChanged() {
    if (!this.matchResultsForm) {
      return;
    }

    const form = this.matchResultsForm;
    const player1Wins = form.get('player1Wins').value;
    const player2Wins = form.get('player2Wins').value;
    const draws = form.get('draws').value;
    const gamesPlayed = player1Wins + player2Wins + draws;

    if (gamesPlayed > 0 && gamesPlayed <= 3) {
      this.resultValid = true;
    } else {
      this.resultValid = false;
    }
  }
}
