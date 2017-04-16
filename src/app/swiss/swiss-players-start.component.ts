import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {
  PlayerService,
  RoundService
} from '../shared';

@Component({
  selector: 'mm-swiss-players-start',
  templateUrl: './swiss-players-start.component.html'
})
export class SwissPlayersStartComponent implements OnInit {
  canBeginTournament = false;
  hasBegunTournament = false;
  numberOfRounds = 3;
  swissPlayersStartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private roundService: RoundService,
    private router: Router
  ) {}

  // canBeginEvent(): boolean {
  //   return this.swissPlayersStartForm.valid && this.numPlayers >= 4 && !this.isFormDisabled;
  // }

  // ngOnChanges() {
  //   if (this.swissPlayersStartForm) {
  //     this.swissPlayersStartForm.reset({
  //       numberOfRounds: this.numRounds
  //     });
  //   }
  // }

  ngOnInit() {
    this.createForm();
    this.playerService.recommendedNumberOfRounds.subscribe(numRounds => {
      this.numberOfRounds = numRounds;
      this.swissPlayersStartForm.reset({
        numberOfRounds: this.numberOfRounds
      });
    });
    this.roundService.canBeginTournament.subscribe((canBegin: boolean) => this.canBeginTournament = canBegin);
    this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => {
      this.hasBegunTournament = hasBegun;

      if (hasBegun) {
        this.swissPlayersStartForm.disable();
      } else {
        this.swissPlayersStartForm.enable();
      }
    });
  }

  onSubmit() {
    this.roundService.setTotalNumberOfRounds(this.swissPlayersStartForm.get('numberOfRounds').value);
    this.roundService.createNextRound();
    this.router.navigate(['/swiss/pairings']);
  }

  private createForm() {
    this.swissPlayersStartForm = this.fb.group({
      numberOfRounds: this.numberOfRounds
    });
  }
}
