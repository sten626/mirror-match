import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { Player } from '../models';

@Injectable()
export class PlayerService {
  nextId = 1;
  players: Player[];

  getAll(): Observable<Player[]> {
    const playerData = localStorage.getItem('players');

    if (playerData) {
      this.players = JSON.parse(playerData);
    } else {
      this.players = [];
      localStorage.setItem('players', JSON.stringify(this.players));
    }

    return Observable.create(observer => {
      observer.next(this.players);
      observer.complete();
    });
  }

  // save(player: Player): Observable<Player> {
  //   if (!player.id) {
  //     player.id = this.nextId++;
  //   }
  // }


  // players: Player[];

  // delete(player: Player): void {
  //   this.players.splice(this.players.indexOf(player), 1);
  //   localStorage.setItem('players', JSON.stringify(this.players));
  // }

  // getRecommendedNumberOfRounds(): number {
  //   return Math.max(3, Math.ceil(Math.log2(this.players.length)));
  // }

  // save(player: Player): void {
  //   if (!player.id) {
  //     player.id = this.nextId++;
  //     this.players.push(player);
  //   }

  //   localStorage.setItem('players', JSON.stringify(this.players));
  // }

  // private calculateMaxId(): void {
  //   let maxId = 0;

  //   this.players.forEach((player) => {
  //     if (player.id > maxId) {
  //       maxId = player.id;
  //     }
  //   });

  //   this.nextId = maxId + 1;
  // }
}
