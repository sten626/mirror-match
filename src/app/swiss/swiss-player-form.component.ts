import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Player, PlayerService } from '../shared';

@Component({
  selector: 'mm-swiss-player-form',
  templateUrl: 'swiss-player-form.component.html'
})
export class SwissPlayerFormComponent implements OnChanges, OnInit {
  @Input() player: Player;
  @Output() onSubmit = new EventEmitter<void>();

  errors = {};
  swissPlayerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService
  ) { }

  ngOnChanges() {
    if (this.swissPlayerForm) {
      this.swissPlayerForm.reset({
        name: this.player.name
      });
    }
  }

  ngOnInit() {
    this.createForm();
  }

  submit() {
    this.updatePlayer();
    this.playerService.save(this.player).subscribe(player => {
      this.player = player;
      this.onSubmit.emit();
    }, err => {
      // TODO: Error handling.
      console.log(err);
    });
  }

  private createForm() {
    this.swissPlayerForm = this.fb.group({
      name: ['', [
        Validators.required
      ]]
    });
  }

  private updatePlayer() {
    Object.assign(this.player, this.swissPlayerForm.value);
  }
}
