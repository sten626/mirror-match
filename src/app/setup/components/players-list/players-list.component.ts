import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input() players: Player[];
  @Output() editPlayer = new EventEmitter<{player: Player, otherPlayers: Player[]}>();

  constructor() {}

  editClicked(player: Player) {
    const otherPlayers = this.players.filter(p => p !== player);
    this.editPlayer.emit({player, otherPlayers});
  }
}
