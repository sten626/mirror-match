import { Component, OnInit } from '@angular/core';

import {
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
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.playerService.players.subscribe(players => this.players = players);
    this.playerService.recommendedNumberOfRounds.subscribe(numRounds => {
      this.numberOfRounds = numRounds;
    });
    this.resetSelectedPlayer();
  }

  onDeletePlayer(player: Player) {
    this.playerService.delete(player);
    if (player === this.selectedPlayer) {
      this.resetSelectedPlayer();
    }
  }

  onSelectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  onSubmit(player: Player): void {
    if (player) {
      this.playerService.save(player);
      this.resetSelectedPlayer();
    }
  }

  private resetSelectedPlayer(): void {
    this.selectedPlayer = new Player();
  }
}
