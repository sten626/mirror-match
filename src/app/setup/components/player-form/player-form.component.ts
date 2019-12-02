import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mm-player-form',
  templateUrl: './player-form.component.html'
})
export class PlayerFormComponent {
  @Output() addPlayer = new EventEmitter<string>();

  playerForm = new FormGroup({
    name: new FormControl('')
  });

  onSubmit() {
    this.addPlayer.emit(this.playerForm.value['name']);
    this.playerForm.reset();
  }
}
