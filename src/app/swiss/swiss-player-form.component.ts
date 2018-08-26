import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Player, RoundService } from '../shared';

@Component({
  selector: 'mm-swiss-player-form',
  templateUrl: 'swiss-player-form.component.html',
  styleUrls: ['swiss-player-form.component.css']
})
export class SwissPlayerFormComponent implements OnChanges, OnInit {
  @Input() selectedPlayer: Player;
  @Output() addPlayer = new EventEmitter<Player>();
  @Output() playerFormReset = new EventEmitter<any>();
  @Output() updatePlayer = new EventEmitter<Player>();

  addMode = false;
  hasBegunTournament = false;
  isPlayerDroppable = false;
  isTournamentOver = false;
  swissPlayerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roundService: RoundService
  ) {
    this.createForm();
  }

  ngOnChanges() {
    // TODO: Focus on form field?
    if (this.selectedPlayer && this.selectedPlayer.id) {
      // Modifying an existing player.
      this.swissPlayerForm.reset({
        name: this.selectedPlayer.name
      });
      this.addMode = false;
      this.isPlayerDroppable = !this.selectedPlayer.dropped;
    } else {
      // Adding a new player.
      this.clearForm();
    }
  }

  ngOnInit() {
    // TODO: Cleanup subscriptions.
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

  reset(): void {
    this.playerFormReset.emit();
  }

  submit() {
    const nameControl = this.swissPlayerForm.get('name');
    let name = nameControl.value;
    name = name.trim();
    nameControl.patchValue(name);

    if (name.length === 0) {
      return;
    }

    if (this.addMode) {
      const player = new Player({
        name: name
      });
      this.addPlayer.emit(player);
      this.clearForm();
    } else {
      const player = this.selectedPlayer.copy();
      player.name = name;
      this.updatePlayer.emit(player);
      this.playerFormReset.emit();
    }
  }

  toggleSelectedPlayerDropped() {
    const player = this.selectedPlayer.copy();
    player.dropped = !player.dropped;
    this.updatePlayer.emit(player);
  }

  private createForm() {
    this.swissPlayerForm = this.fb.group({
      name: ['', [
        Validators.required
      ]]
    });
  }

  private clearForm(): void {
    this.swissPlayerForm.reset({
      name: ''
    });
    this.addMode = true;
    this.isPlayerDroppable = false;
  }
}
