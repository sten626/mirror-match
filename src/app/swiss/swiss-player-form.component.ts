import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Player, PlayerService } from '../shared';

@Component({
  selector: 'mm-swiss-player-form',
  templateUrl: 'swiss-player-form.component.html'
})
export class SwissPlayerFormComponent implements OnChanges {
  @Input() player: Player;

  errors = {};
  swissPlayerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService
  ) {
    this.createForm();
  }

  ngOnChanges() {
    this.swissPlayerForm.reset({
      name: this.player.name
    });
  }

  onSubmit() {
    this.updatePlayer();
    this.playerService.save(this.player).subscribe(() => {
      this.swissPlayerForm.reset();
      // TODO: Emit event to unselect a player.
    }, err => {
      this.errors = err;
    });
  }

  private createForm() {
    this.swissPlayerForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  private updatePlayer() {
    Object.assign(this.player, this.swissPlayerForm.value);
  }
}
