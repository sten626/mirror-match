import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Player } from 'app/shared';
import { PlayersPageActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './players-page.component.html'
})
export class PlayersPageComponent {
  canBeginTournament$: Observable<boolean>;
  hasTournamentStarted$: Observable<boolean>;
  isTournamentOver$: Observable<boolean>;
  numberOfActivePlayers$: Observable<number>;
  players$: Observable<Player[]>;
  recommendedNumberOfRounds$: Observable<number>;
  selectedPlayer: Player;

  constructor(
    private store: Store<fromSwiss.State>
  ) {
    this.players$ = store.pipe(
      select(fromSwiss.getAllPlayers)
    );
    this.canBeginTournament$ = store.pipe(
      select(fromSwiss.canBeginTournament)
    );
    this.hasTournamentStarted$ = store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
    this.isTournamentOver$ = store.pipe(
      select(fromSwiss.isTournamentOver)
    );
    this.numberOfActivePlayers$ = store.pipe(
      select(fromSwiss.getTotalActivePlayers)
    );
    this.recommendedNumberOfRounds$ = store.pipe(
      select(fromSwiss.getRecommendedNumberOfRounds)
    );
  }

  /**
   * Dispatch an addPlayer action.
   * @param playerName The name of the new player to add.
   */
  addPlayer(playerName: string): void {
    if (playerName) {
      this.store.dispatch(PlayersPageActions.addPlayer({playerName}));
    }
  }

  /**
   * Set the selected player to null.
   */
  clearSelectedPlayer(): void {
    this.selectedPlayer = null;
  }

  /**
   * Dispath a deletePlayer action and clear it if it was the selected player.
   * @param playerId The id of the player to delete.
   */
  deletePlayer(playerId: number): void {
    if (playerId) {
      this.store.dispatch(PlayersPageActions.deletePlayer({playerId}));

      if (playerId === this.selectedPlayer.id) {
        this.clearSelectedPlayer();
      }
    }
  }

  /**
   * Dispath a beginEvent action.
   * @param numberOfRounds The number of rounds for the tournmant to have.
   */
  onStartTournament(numberOfRounds: number): void {
    if (numberOfRounds) {
      this.store.dispatch(PlayersPageActions.beginEvent({numberOfRounds}));
    }
  }

  /**
   * Set the selected player.
   * @param player The Player being selected.
   */
  selectPlayer(player: Player): void {
    this.selectedPlayer = player;
  }

  /**
   * Toggle the "dropped" status of a Player by dispatching a togglePlayerDropped action.
   * @param player The Player to drop or undrop.
   */
  togglePlayerDropped(player: Player): void {
    if (player) {
      this.store.dispatch(PlayersPageActions.togglePlayerDropped({player}));
      this.selectedPlayer = null;
    }
  }

  /**
   * Dispatches an updatePlayerName action.
   * @param event An object containing player and name, where name is the new name.
   */
  updatePlayerName(event: {player: Player, name: string}): void {
    const {player, name} = event;

    if (!player || !name) {
      return;
    }

    this.store.dispatch(PlayersPageActions.updatePlayerName({player, name}));
  }
}
