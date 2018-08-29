import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Player, PlayerService, RoundService } from '../shared';

@Component({
  templateUrl: './swiss-players.component.html'
})
export class SwissPlayersComponent {
  hasBegunTournament$: Observable<boolean>;
  isTournamentOver$: Observable<boolean>;
  players$: Observable<Player[]>;
  selectedPlayer: Player;

  constructor(
    private playerService: PlayerService,
    private roundService: RoundService
  ) {
    this.hasBegunTournament$ = this.roundService.hasBegunTournament;
    this.isTournamentOver$ = this.roundService.isTournamentOver;
    this.players$ = this.playerService.players$;
  }

  /**
   * Add a new Player via the PlayerService.
   * @param player The new Player to add.
   */
  addPlayer(player: Player): void {
    this.playerService.addPlayer(player);
  }

  /**
   * Set the selected player to null.
   */
  clearSelectedPlayer(): void {
    this.selectedPlayer = null;
  }

  /**
   * Delete a Player via the PlayerService and clear it if it was the selected player.
   * @param player The Player to be deleted.
   */
  onPlayerDeleted(player: Player): void {
    this.playerService.deletePlayer(player);

    if (player === this.selectedPlayer) {
      this.clearSelectedPlayer();
    }
  }

  /**
   * Event handler for selecting a Player.
   * @param player The Player being selected.
   */
  onPlayerSelected(player: Player): void {
    this.selectedPlayer = player;
  }

  /**
   * Event handler for updating an existing Player.
   * @param player The Player being updated.
   */
  updatePlayer(player: Player): void {
    this.playerService.updatePlayer(player);
  }
}
