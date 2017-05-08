import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Pairing,
  PairingService,
  RoundService
} from '../shared';

@Component({
  selector: 'mm-match-results',
  templateUrl: './match-results.component.html'
})
export class MatchResultsComponent implements OnInit {
  matchResultsForm: FormGroup;
  selectedPairing: Pairing;
  resultValid: boolean;

  private selectedRound: number;
  private selectedRoundComplete = false;

  constructor(
    private fb: FormBuilder,
    private pairingService: PairingService,
    private roundService: RoundService,
    private router: Router
  ) {}

  clearMatchResult() {
    this.selectedPairing.player1Wins = 0;
    this.selectedPairing.player2Wins = 0;
    this.selectedPairing.draws = 0;
    this.selectedPairing.submitted = false;
    this.pairingService.saveAndClearSelected();
    this.roundService.markRoundAsIncomplete(this.selectedRound);
  }

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

  ngOnInit() {
    this.createForm();

    // Subscribe to data.
    this.roundService.selectedRound.subscribe((round: number) => this.selectedRound = round);
    this.pairingService.selectedPairing.subscribe((pairing: Pairing) => {
      this.selectedPairing = pairing;
      this.resetForm();
    });
    this.roundService.selectedRoundComplete.subscribe((complete: boolean) => this.selectedRoundComplete = complete);
  }

  submit() {
    const form = this.matchResultsForm;
    this.selectedPairing.player1Wins = form.get('player1Wins').value;
    this.selectedPairing.player2Wins = form.get('player2Wins').value;
    this.selectedPairing.draws = form.get('draws').value;
    this.selectedPairing.submitted = true;
    this.pairingService.saveAndClearSelected();

    if (this.selectedRoundComplete) {
      this.roundService.markRoundAsComplete(this.selectedRound);
      this.router.navigate(['/swiss/standings']);
    }
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
