import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Pairing } from '../shared';

@Component({
  selector: 'mm-match-results',
  templateUrl: './match-results.component.html'
})
export class MatchResultsComponent implements OnChanges, OnInit {
  @Input() activePairing: Pairing;

  matchResultsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {

  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.matchResultsForm = this.fb.group({
      player1Wins: 0,
      player2Wins: 0,
      draws: 0
    });
  }
}
