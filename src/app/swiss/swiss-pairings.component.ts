import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {
  // PairingService,
  Player,
  // PlayerService,
  RoundService
} from '../shared';

@Component({
  templateUrl: './swiss-pairings.component.html'
})
export class SwissPairingsComponent implements OnInit {
  // activeRoundPairingsExist = false;
  rounds: Observable<number[]>;
  pairingsForm: FormGroup;
  players: Player[];
  selectedRound: number;

  constructor(
    private fb: FormBuilder,
    // private pairingService: PairingService,
    // private playerService: PlayerService,
    private roundService: RoundService
  ) {}

  // generatePairings() {
  //   this.pairingService.createPairings(1, this.players).subscribe(() => {}, error => {
  //     // TODO Error handling.
  //     console.error(error);
  //   });
  // }

  ngOnInit() {
    // this.playerService.players.subscribe(players => this.players = players);
    this.rounds = this.roundService.rounds;
    this.createForm();
    this.roundService.selectedRound.subscribe((round: number) => {
      this.selectedRound = round;
      this.pairingsForm.reset({
        currentRound: this.selectedRound
      });
    });
    // this.pairingService.get(this.pairingsForm.value.currentRound).subscribe(pairings => {
    //   this.activeRoundPairingsExist = pairings.length > 0;
    // });
  }

  private createForm() {
    this.pairingsForm = this.fb.group({
      currentRound: 1
    });
  }
}
