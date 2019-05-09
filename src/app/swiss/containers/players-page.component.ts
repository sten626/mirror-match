import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player, RoundService } from '../../shared';
import { PlayersPageActions } from '../actions';
import * as fromSwiss from '../reducers';
import { map } from 'rxjs/operators';


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
    private roundService: RoundService,
    private router: Router
  ) {
    this.players$ = store.pipe(
      select(fromSwiss.selectAllPlayers)
    );
    this.canBeginTournament$ = store.pipe(
      select(fromSwiss.selectPlayerTotal),
      map((playerTotal: number) => playerTotal >= 4)
    );
    this.hasBegunTournament$ = this.roundService.hasBegunTournament$;
    this.isTournamentOver$ = this.roundService.isTournamentOver$;
    this.recommendedNumberOfRounds$ = store.pipe(
      select(fromSwiss.selectPlayerTotal),
      map((playerTotal: number) => Math.max(3, Math.ceil(Math.log2(playerTotal))))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new PlayersPageActions.LoadPlayers());
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
  onPlayerDeleted(player: Player): void {
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
    this.roundService.setTotalNumberOfRounds(numOfRounds);
    this.roundService.createNextRound();
    this.router.navigate(['/swiss/pairings']);
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
