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

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayers();
    this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
    this.resetSelectedPlayer();
  }

  deletePlayer(player: Player): void {
    this.playerService.delete(player);

    if (player === this.selectedPlayer) {
      this.resetSelectedPlayer();
    }

    this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
  }

  onSelectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  onSubmit(): void {
    this.resetSelectedPlayer();
    this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
  }

  private resetSelectedPlayer(): void {
    this.selectedPlayer = new Player();
  }

  private getPlayers(): void {
    this.playerService.getAll().subscribe(players => this.players = players);
  }
}
