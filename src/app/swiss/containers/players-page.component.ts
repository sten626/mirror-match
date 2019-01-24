import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Player, PlayerService, RoundService } from 'app/shared';
import * as fromSwiss from '../reducers';
import { PlayersPageActions } from '../actions';

@Component({
  templateUrl: './players-page.component.html'
})
export class PlayersPageComponent implements OnInit {
  canBeginTournament$: Observable<boolean>;
  hasBegunTournament$: Observable<boolean>;
  isTournamentOver$: Observable<boolean>;
  players$: Observable<Player[]>;
  recommendedNumberOfRounds$: Observable<number>;
  selectedPlayer: Player;

  constructor(
    private store: Store<fromSwiss.State>,
    private playerService: PlayerService,
    private roundService: RoundService,
    private router: Router
  ) {
    this.canBeginTournament$ = this.roundService.canBeginTournament$;
    this.hasBegunTournament$ = this.roundService.hasBegunTournament$;
    this.isTournamentOver$ = this.roundService.isTournamentOver$;
    this.players$ = this.playerService.players$;
    this.recommendedNumberOfRounds$ = this.playerService.recommendedNumberOfRounds$;
  }

  ngOnInit(): void {
    this.store.dispatch(new PlayersPageActions.LoadPlayers());
  }

  /**
   * Add a new Player via the PlayerService.
   * @param player The new Player to add.
   */
  addPlayer(player: Player): void {
    // this.playerService.addPlayer(player);
    // TODO: Update doc
    this.store.dispatch(new PlayersPageActions.AddPlayer(player));
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
   * Use the RoundService to create the first round and then navigate to the pairings page.
   * @param numOfRounds The number of rounds for the tournmant to have.
   */
  onStartTournament(numOfRounds: number): void {
    this.roundService.setTotalNumberOfRounds(numOfRounds);
    this.roundService.createNextRound();
    this.router.navigate(['/swiss/pairings']);
  }

  /**
   * Event handler for updating an existing Player.
   * @param player The Player being updated.
   */
  updatePlayer(player: Player): void {
    this.playerService.updatePlayer(player);
  }
}
