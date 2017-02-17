import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  PairingsService,
  Player,
  PlayerService
} from '../shared';

@Component({
  templateUrl: './swiss-players.component.html'
})
export class SwissPlayersComponent implements OnInit {
  numberOfRounds: number;
  players: Player[] = [];
  selectedPlayer: Player;

  constructor(
    private pairingsService: PairingsService,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPlayers();
    this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
    this.resetSelectedPlayer();
  }

  onBeginEvent(numRounds: number) {
    this.pairingsService.roundsTotal = numRounds;
    this.pairingsService.hasBegunPairings = true;
    this.router.navigate(['/swiss/pairings']);
  }

  onDeletePlayer(player: Player) {
    this.playerService.delete(player).subscribe(() => {
      if (player === this.selectedPlayer) {
        this.resetSelectedPlayer();
      }

      this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
    }, err => {
      // TODO: Error handling.
      console.log(err);
    });
  }

  onSelectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  onSubmit(player: Player): void {
    if (player) {
      this.playerService.save(player).subscribe(() => {
        this.resetSelectedPlayer();
        this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
      }, err => {
        // TODO: Error handling.
        console.log(err);
      });
    }
  }

  private resetSelectedPlayer(): void {
    this.selectedPlayer = new Player();
  }

  private getPlayers(): void {
    this.playerService.getAll().subscribe(players => this.players = players);
  }
}
