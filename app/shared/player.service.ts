import { Injectable } from '@angular/core';

import { Player } from './player.model';

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
      let playersData = localStorage.getItem('players');

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

  save(player: Player): Player {
    if (player.id) {
      // TODO
      return player;
    } else {
      player.id = this.nextId++;
      this.players.push(player);
      localStorage.setItem('players', JSON.stringify(this.players));

      return player;
    }
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
