import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player, PlayerService } from '../shared';

@Component({
  templateUrl: './swiss-players.component.html'
})
export class SwissPlayersComponent implements OnInit {
  selectedPlayer: Player;

  // Observables
  players$: Observable<Player[]>;

  constructor(private playerService: PlayerService) {
    this.players$ = playerService.players$;
  }

  ngOnInit() {
    this.playerService.loadPlayers();
  }

  /**
   * Adds a new player via the player service.
   * @param player The player to add.
   */
  addPlayer(player: Player): void {
    this.playerService.addPlayer(player);
  }

  /**
   * Delete a player via the player service.
   * @param player The player to be deleted.
   */
  deletePlayer(player: Player): void {
    this.playerService.deletePlayer(player);
  }

  /**
   * Sets the selected player.
   * @param player The player being selected.
   */
  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }

  /**
   * Set the selected player to null.
   */
  unselect(): void {
    this.selectedPlayer = null;
  }

  /**
   * Save changes on an existing player via the player service.
   * @param player The player being updated.
   */
  updatePlayer(player: Player): void {
    this.playerService.updatePlayer(player);
  }
}
