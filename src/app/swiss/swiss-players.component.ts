import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player, PlayerService, RoundService } from '../shared';

@Component({
  templateUrl: './swiss-players.component.html'
})
export class SwissPlayersComponent implements OnInit {
  selectedPlayer: Player;

  // Observables
  canBeginTournament$: Observable<boolean>;
  players$: Observable<Player[]>;
  recommendedNumOfRounds$: Observable<number>;

  constructor(
    private playerService: PlayerService,
    private roundService: RoundService,
    private router: Router
  ) {
    this.players$ = playerService.players$;
    const numOfPlayers$ = this.players$.pipe(
      map((players: Player[]) => players.length)
    );
    this.recommendedNumOfRounds$ = numOfPlayers$.pipe(
      map((numOfPlayers: number) => Math.max(3, Math.ceil(Math.log2(numOfPlayers))))
    );
    this.canBeginTournament$ = numOfPlayers$.pipe(
      map((numOfPlayers: number) => numOfPlayers >= 4)
    );
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
    if (this.selectedPlayer === player) {
      this.unselect();
    }

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
   * Event handler for starting the tournament.
   * @param numOfRounds The number of rounds for the tournament to have.
   */
  startClicked(numOfRounds: number): void {
    this.roundService.setTotalNumOfRounds(numOfRounds);
    this.roundService.createNextRound();
    this.router.navigate(['/swiss/pairings']);
  }

  /**
   * Set the selected player to null.
   */
  unselect(): void {
    this.selectedPlayer = {id: null, name: ''};
  }

  /**
   * Save changes on an existing player via the player service.
   * @param player The player being updated.
   */
  updatePlayer(player: Player): void {
    this.playerService.updatePlayer(player);
  }
}
