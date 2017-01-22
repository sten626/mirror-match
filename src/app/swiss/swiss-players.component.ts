import { Component, OnInit } from '@angular/core';

import {
  Player,
  PlayerService
} from '../shared';

@Component({
  templateUrl: './swiss-players.component.html'
})
export class SwissPlayersComponent implements OnInit {
  editingPlayer: boolean;
  numberOfRounds: number;
  players: Player[] = [];
  selectedPlayer: Player;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayers();
    this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
    this.clearPlayerInput();
  }

  deletePlayer(player: Player): void {
    this.playerService.delete(player);

    if (player === this.selectedPlayer) {
      this.clearPlayerInput();
    }

    this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
  }

  savePlayer(): void {
    if (this.selectedPlayer.name) {
      this.playerService.save(this.selectedPlayer);
      this.clearPlayerInput();
      this.numberOfRounds = this.playerService.getRecommendedNumberOfRounds();
    }
  }

  selectPlayer(player: Player): void {
    this.selectedPlayer = player;
    this.editingPlayer = true;
  }

  private clearPlayerInput(): void {
    this.selectedPlayer = new Player();
    this.editingPlayer = false;
  }

  private getPlayers(): void {
    this.players = this.playerService.getPlayers();
  }
}
