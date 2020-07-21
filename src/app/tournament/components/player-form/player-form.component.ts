import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Player } from '@app/shared/models';
// import { newPlayerValidator } from '@app/shared/new-player.validator';

@Component({
  selector: 'mm-player-form',
  templateUrl: './player-form.component.html'
})
export class PlayerFormComponent implements OnChanges {
  @Input() players: Player[];
  @Output() addPlayer = new EventEmitter<string>();

  playerForm: FormGroup;

  constructor() {
    this.playerForm = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnChanges() {
    this.playerForm.setControl('name', new FormControl(''));
  }

  isNameEmpty(): boolean {
    let name: string = this.playerForm.get('name').value;

    if (!name) {
      return true;
    }

    name = name.trim();

    return name.length === 0;
  }

  getErrorMessage(): string {
    if (this.playerForm.get('name').hasError('playerAlreadyExists')) {
      return 'Player with this name already registered';
    }
  }

  onSubmit() {
    this.addPlayer.emit(this.playerForm.value['name']);
    this.playerForm.reset();
  }
}
