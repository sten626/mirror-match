import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Player } from '@app/shared/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'mm-players-list-item',
  templateUrl: './players-list-item.component.html'
})
export class PlayersListItemComponent implements OnChanges {
  @Input() player: Player;
  @Input() selected: boolean;
  @Output() playerNameChange = new EventEmitter<Update<Player>>();

  playerEditForm = new FormGroup({
    name: new FormControl('')
  });

  constructor() {}

  ngOnChanges() {
    this.playerEditForm.patchValue({
      name: this.player.name
    });
  }

  onSubmit() {
    this.playerNameChange.emit({
      id: this.player.id,
      changes: {
        name: this.playerEditForm.value['name']
      }
    });
  }
}
