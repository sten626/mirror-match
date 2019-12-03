import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Player } from '@app/shared/models';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html'
})
export class PlayersListComponent implements OnChanges {
  @Input() players: Player[];
  @Output() playerNameChange = new EventEmitter<{player: Player, name: string}>();

  selectedPlayer: Player;

  constructor() {}

  ngOnChanges() {
    this.selectedPlayer = null;
  }

  onSelect(player: Player) {
    this.selectedPlayer = player;
  }
}
