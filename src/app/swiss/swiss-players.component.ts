import { Component } from '@angular/core';
import { Player, PlayerService } from '../shared';

@Component({
  templateUrl: './swiss-players.component.html'
})
export class SwissPlayersComponent {
  selectedPlayer: Player;

  constructor(private playerService: PlayerService) {}

  addPlayer(player: Player): void {
    this.playerService.addPlayer(player);
  }

  clearSelectedPlayer(): void {
    this.selectedPlayer = null;
  }

  onPlayerSelected(player: Player): void {
    this.selectedPlayer = player;
  }

  updatePlayer(player: Player): void {
    this.playerService.updatePlayer(player);
  }
}
