import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from 'app/shared';

@Component({
  selector: 'mm-player-form',
  templateUrl: 'player-form.component.html',
  styleUrls: ['player-form.component.css']
})
export class PlayerFormComponent implements OnChanges {
  @Input() hasTournamentStarted: boolean;
  @Input() isTournamentOver: boolean;
  @Input() selectedPlayer: Player;
  @Output() addPlayer = new EventEmitter<Player>();
  @Output() reset = new EventEmitter<any>();
  @Output() togglePlayerDropped = new EventEmitter<Player>();
  @Output() updatePlayerName = new EventEmitter<{player: Player, name: string}>();

  @ViewChild('name', { static: true }) playerNameElement: ElementRef;

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

    if (this.isTournamentOver && this.hasTournamentStarted) {
      this.swissPlayerForm.disable();
    } else {
      this.swissPlayerForm.enable();
    }
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
      this.addPlayer.emit(name);
      this.clearForm();
    } else {
      this.updatePlayerName.emit({
        player: this.selectedPlayer,
        name: name
      });
      this.reset.emit();
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
