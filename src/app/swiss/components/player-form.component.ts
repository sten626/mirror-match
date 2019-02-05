import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Player } from '../../shared';

@Component({
  selector: 'mm-swiss-player-form',
  templateUrl: 'player-form.component.html',
  styleUrls: ['player-form.component.css']
})
export class PlayerFormComponent implements OnChanges {
  @Input() hasBegunTournament: boolean;
  @Input() isTournamentOver: boolean;
  @Input() selectedPlayer: Player;
  @Output() addPlayer = new EventEmitter<Player>();
  @Output() playerFormReset = new EventEmitter<any>();
  @Output() updatePlayerName = new EventEmitter<{player: Player, name: string}>();

  @ViewChild('name') playerNameElement: ElementRef;

  addMode = false;
  isPlayerDroppable = false;
  swissPlayerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges() {
    if (this.selectedPlayer && this.selectedPlayer.id) {
      // Modifying an existing player.
      this.playerNameElement.nativeElement.focus();
      this.swissPlayerForm.reset({
        name: this.selectedPlayer.name
      });
      this.addMode = false;
      this.isPlayerDroppable = !this.selectedPlayer.dropped;
    } else {
      // Adding a new player.
      this.clearForm();
    }

    if (this.isTournamentOver && this.hasBegunTournament) {
      this.swissPlayerForm.disable();
    } else {
      this.swissPlayerForm.enable();
    }
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
      const player: Player = {
        name: name
      };
      this.addPlayer.emit(player);
      this.clearForm();
    } else {
      this.updatePlayerName.emit({
        player: this.selectedPlayer,
        name: name
      });
      this.playerFormReset.emit();
    }
  }

  toggleSelectedPlayerDropped() {
    // TODO: Fix
    console.log('Need to fix.');
    // const player = this.selectedPlayer.copy();
    // player.dropped = !player.dropped;
    // this.updatePlayer.emit(player);
    // this.playerFormReset.emit();
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
