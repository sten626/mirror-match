import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  PairingsService,
  Player,
  PlayerService
} from '../shared';

@Component({
  selector: 'mm-swiss-player-form',
  templateUrl: 'swiss-player-form.component.html'
})
export class SwissPlayerFormComponent implements OnInit {
  currentPlayer: Player;
  swissPlayerForm: FormGroup;

  private isFormDisabled = false;

  constructor(
    private fb: FormBuilder,
    private pairingsService: PairingsService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.createForm();
    this.playerService.selectedPlayer.subscribe(player => {
      this.currentPlayer = player;
      this.swissPlayerForm.reset({
        name: this.currentPlayer.name
      });
    });

    this.pairingsService.hasBegunPairings().subscribe(hasBegunPairings => {
      this.isFormDisabled = hasBegunPairings;

      if (this.isFormDisabled) {
        this.swissPlayerForm.get('name').disable();
      } else {
        this.swissPlayerForm.get('name').enable();
      }
    });
  }

  submit() {
    this.updatePlayer();
    this.playerService.save(this.currentPlayer);
    this.playerService.setSelectedPlayer(new Player());
  }

  private createForm() {
    this.swissPlayerForm = this.fb.group({
      name: ['', [
        Validators.required
      ]]
    });
  }

  private updatePlayer() {
    Object.assign(this.currentPlayer, this.swissPlayerForm.value);
  }
}
