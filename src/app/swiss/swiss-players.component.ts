import { Component } from '@angular/core';
import { Player } from '../shared';

@Component({
  templateUrl: './swiss-players.component.html'
})
export class SwissPlayersComponent {
  selectedPlayer: Player;

  onPlayerSelected(player: Player) {
    this.selectedPlayer = player;
  }
}
