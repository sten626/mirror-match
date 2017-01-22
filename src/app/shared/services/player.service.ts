import { Injectable } from '@angular/core';

import { Player } from '../models';

@Injectable()
export class PlayerService {
  nextId = 1;
  players: Player[];

  delete(player: Player): void {
    this.players.splice(this.players.indexOf(player), 1);
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  getPlayers(): Player[] {
    if (!this.players) {
      const playersData = localStorage.getItem('players');

      if (playersData !== null) {
        this.players = JSON.parse(playersData);
      } else {
        this.players = [];
        localStorage.setItem('players', JSON.stringify(this.players));
      }
    }

    this.calculateMaxId();

    return this.players;
  }

  getRecommendedNumberOfRounds(): number {
    return Math.max(3, Math.ceil(Math.log2(this.players.length)));
  }

  save(player: Player): void {
    if (!player.id) {
      player.id = this.nextId++;
      this.players.push(player);
    }

    localStorage.setItem('players', JSON.stringify(this.players));
  }

  private calculateMaxId(): void {
    let maxId = 0;

    this.players.forEach((player) => {
      if (player.id > maxId) {
        maxId = player.id;
      }
    });

    this.nextId = maxId + 1;
  }
}
