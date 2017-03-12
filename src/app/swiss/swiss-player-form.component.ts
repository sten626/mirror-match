import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  PairingsService,
  Player
} from '../shared';

@Component({
  selector: 'mm-swiss-player-form',
  templateUrl: 'swiss-player-form.component.html'
})
export class SwissPlayerFormComponent implements OnChanges, OnInit {
  @Input() player: Player;
  @Output() onSubmit = new EventEmitter<Player>();

  swissPlayerForm: FormGroup;

  private isFormDisabled = false;

  constructor(
    private fb: FormBuilder,
    private pairingsService: PairingsService
  ) {}

  ngOnChanges() {
    if (this.swissPlayerForm) {
      this.swissPlayerForm.reset({
        name: this.player.name
      });
    }
  }

  ngOnInit() {
    this.createForm();
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
    this.onSubmit.emit(this.player);
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
