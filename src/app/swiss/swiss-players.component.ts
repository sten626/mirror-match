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

  addPlayer(player: Player): void {
    this.playerService.addPlayer(player);
  }

  clearSelectedPlayer(): void {
    this.selectedPlayer = null;
  }

  onPlayerDeleted(player: Player): void {
    this.playerService.deletePlayer(player);

    if (player === this.selectedPlayer) {
      this.clearSelectedPlayer();
    }
  }

  onPlayerSelected(player: Player): void {
    this.selectedPlayer = player;
  }

  updatePlayer(player: Player): void {
    this.playerService.updatePlayer(player);
  }
}
