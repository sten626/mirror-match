import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Player } from '@app/shared/models';
import { newPlayerValidator } from '@app/shared/new-player.validator';

@Component({
  selector: 'mm-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnChanges {
  @Input() players: Player[];
  @Output() addPlayer = new EventEmitter<string>();

  playerForm: FormGroup;

  constructor() {}

  ngOnChanges() {
    this.playerForm = new FormGroup({
      name: new FormControl('', [newPlayerValidator(this.players)])
    });
  }

  getErrorMessage(): string {
    if (this.playerForm.get('name').hasError('playerAlreadyExists')) {
      return 'Player with this name already registed';
    }
  }

  onSubmit() {
    this.addPlayer.emit(this.playerForm.value['name']);
    this.playerForm.reset();
  }
}
