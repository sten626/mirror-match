import { Injectable } from '@angular/core';

import { Player } from '../models';

@Injectable()
export class PlayerService {
  private nextId = 1;
  private players: Player[];
  private playersKey = 'players';

  delete(player: Player): void {
    this.players.splice(this.players.indexOf(player), 1);
    localStorage.setItem(this.playersKey, JSON.stringify(this.players));
  }

  getAll(): Player[] {
    if (!this.players) {
      const playersData = localStorage.getItem(this.playersKey);

      if (playersData) {
        this.players = JSON.parse(playersData);
      } else {
        this.players = [];
        localStorage.setItem(this.playersKey, JSON.stringify(this.players));
      }
    }

    this.initNextId();

    return this.players;
  }

  getRecommendedNumberOfRounds(): number {
    return Math.max(3, Math.ceil(Math.log2(this.players.length)));
  }

  save(player: Player): Player {
    if (!player.id) {
      // New player.
      player.id = this.nextId++;
      this.players.push(player);
    }

    localStorage.setItem(this.playersKey, JSON.stringify(this.players));
    return player;
  }

  private initNextId(): void {
    if (this.players.length > 0) {
      const ids = this.players.map(player => player.id);
      this.nextId = Math.max(...ids) + 1;
    } else {
      this.nextId = 1;
    }
  }
}
