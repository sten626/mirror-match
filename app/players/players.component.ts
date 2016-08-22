import { Component, OnInit } from '@angular/core';

import { Player } from '../shared/player.model';
import { PlayerService } from '../shared/player.service';

@Component({
  templateUrl: 'app/players/players.component.html'
})
export class PlayersComponent implements OnInit {
  numberOfRounds = 3;
  playerName: string;
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  addPlayer(): void {
    if (this.playerName) {
      let player = new Player();
      player.name = this.playerName;
      player = this.playerService.save(player);
      this.playerName = '';
    }
  }

  deletePlayer(player: Player): void {
    this.playerService.delete(player);
  }

  private getPlayers(): void {
    this.players = this.playerService.getPlayers();
  }
}
