import { Component, Input, OnChanges, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Player,
  PlayerService,
  RoundService
} from '../shared';

@Component({
  selector: 'mm-swiss-player-form',
  templateUrl: 'swiss-player-form.component.html',
  styleUrls: ['swiss-player-form.component.css']
})
export class SwissPlayerFormComponent implements OnChanges, OnInit {
  @Input() selectedPlayer: Player;

  addMode = false;
  editingPlayer: Player;
  hasBegunTournament = false;
  isTournamentOver = false;
  swissPlayerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private roundService: RoundService
  ) {
    this.createForm();
  }

  ngOnChanges() {
    // TODO: Focus on form field?
    if (this.selectedPlayer && this.selectedPlayer.id) {
      // Modifying an existing player.
      this.editingPlayer = this.selectedPlayer.copy();
      this.addMode = false;
    } else {
      // Adding a new player.
      this.editingPlayer = new Player();
      this.addMode = true;
    }
  }

  ngOnInit() {
    this.playerService.selectedPlayer$.subscribe(player => {
      this.currentPlayer = player;
      this.swissPlayerForm.reset({
        name: this.currentPlayer.name
      });
    });

    this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => {
      this.hasBegunTournament = hasBegun;
    });

    this.roundService.isTournamentOver.subscribe((isOver: boolean) => {
      this.isTournamentOver = isOver;

      if (isOver && this.hasBegunTournament) {
        this.swissPlayerForm.disable();
      } else {
        this.swissPlayerForm.enable();
      }
    });
  }

  reset() {
    this.playerService.setSelectedPlayer(new Player());
  }

  submit() {
    const nameControl = this.swissPlayerForm.get('name');
    let name = nameControl.value;
    name = name.trim();
    nameControl.patchValue(name);

    if (name.length === 0) {
      return;
    }

    this.updatePlayer();
    this.playerService.addPlayer(this.currentPlayer);
    this.playerService.setSelectedPlayer(new Player());
  }

  toggleCurrentPlayerDropped() {
    this.currentPlayer.dropped = !this.currentPlayer.dropped;
    this.playerService.updatePlayer(this.currentPlayer);
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
