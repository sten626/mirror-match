import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';

import { Player } from '../models';

@Injectable()
export class PlayerService {
  private nextId = 1;
  private players: Player[];
  private playersKey = 'players';
  private playersSubject = new BehaviorSubject<Player[]>([]);

  delete(player: Player): Observable<boolean> {
    this.players.splice(this.players.indexOf(player), 1);
    localStorage.setItem(this.playersKey, JSON.stringify(this.players));
    this.playersSubject.next(this.players.slice());

    const deleteObservable = new Observable(observer => {
      observer.next(true);
      observer.complete();
    });

    return deleteObservable;
  }

  getAll(): Observable<Player[]> {
    if (!this.players) {
      const playersData = localStorage.getItem(this.playersKey);

      if (playersData) {
        this.players = JSON.parse(playersData);
      } else {
        this.players = [];
        localStorage.setItem(this.playersKey, JSON.stringify(this.players));
      }

      this.initNextId();
    }

    this.playersSubject.next(this.players.slice());

    return this.playersSubject.asObservable().distinctUntilChanged();
  }

  getRecommendedNumberOfRounds(): number {
    return Math.max(3, Math.ceil(Math.log2(this.players.length)));
  }

  save(player: Player): Observable<Player> {
    if (!player.id) {
      // New player.
      player.id = this.nextId++;
      this.players.push(player);
    }

    localStorage.setItem(this.playersKey, JSON.stringify(this.players));
    this.playersSubject.next(this.players.slice());

    const playerObservable = new Observable(observer => {
      observer.next(player);
      observer.complete();
    });

    return playerObservable;
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
