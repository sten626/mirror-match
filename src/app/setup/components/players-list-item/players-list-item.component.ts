import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Player } from '@app/shared/models';

@Component({
  selector: 'mm-players-list-item',
  templateUrl: './players-list-item.component.html'
})
export class PlayersListItemComponent implements OnChanges {
  @Input() player: Player;
  @Input() selected: boolean;

  playerEditForm = new FormGroup({
    name: new FormControl('')
  });

  constructor() {}

  ngOnChanges() {
    this.playerEditForm.patchValue({
      name: this.player.name
    });
  }
}
