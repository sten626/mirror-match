import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../../shared';
import { PlayersPageActions } from '../actions';
import * as fromSwiss from '../reducers';

@Component({
  templateUrl: './players-page.component.html'
})
export class PlayersPageComponent implements OnInit {
  canBeginTournament$: Observable<boolean>;
  hasBegunTournament$: Observable<boolean>;
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
      select(fromSwiss.getNumberOfPlayers),
      map((playerTotal: number) => playerTotal >= 4)
    );
    this.hasBegunTournament$ = store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
    this.isTournamentOver$ = store.pipe(
      select(fromSwiss.isTournamentOver)
    );
    this.numberOfActivePlayers$ = store.pipe(
      select(fromSwiss.getNumberOfActivePlayers)
    );
    this.recommendedNumberOfRounds$ = store.pipe(
      select(fromSwiss.getNumberOfPlayers),
      map((playerTotal: number) => Math.max(3, Math.ceil(Math.log2(playerTotal))))
    );
  }

  ngOnInit(): void {
    // this.store.dispatch(new PlayersPageActions.LoadPlayers());
    // this.store.dispatch(new PlayersPageActions.LoadTournament());
  }

  /**
   * Dispatch an AddPlayer action.
   * @param player The new Player to add.
   */
  addPlayer(player: Player): void {
    this.store.dispatch(new PlayersPageActions.AddPlayer(player));
  }

  /**
   * Set the selected player to null.
   */
  clearSelectedPlayer(): void {
    this.selectedPlayer = null;
  }

  /**
   * Dispath a DeletePlayer action and clear it if it was the selected player.
   * @param player The Player to be deleted.
   */
  deletePlayer(player: Player): void {
    this.store.dispatch(new PlayersPageActions.DeletePlayer(player));

    if (player === this.selectedPlayer) {
      this.clearSelectedPlayer();
    }
  }

  /**
   * Use the RoundService to create the first round and then navigate to the pairings page.
   * @param numOfRounds The number of rounds for the tournmant to have.
   */
  onStartTournament(numOfRounds: number): void {
    this.store.dispatch(new PlayersPageActions.BeginEvent(numOfRounds));
  }

  /**
   * Set the selected player.
   * @param player The Player being selected.
   */
  selectPlayer(player: Player): void {
    this.selectedPlayer = player;
  }

  updatePlayerName(event: {player: Player, name: string}): void {
    const {player, name} = event;

    if (!player || !name) {
      return;
    }

    this.store.dispatch(new PlayersPageActions.UpdatePlayerName(player, name));
  }
}
