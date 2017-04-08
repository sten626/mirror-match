import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';

import { Player } from '../models';

@Injectable()
export class PlayerService {
  numPlayers = 0;
  private nextId = 1;
  private players: Player[];
  private playersCache = {};
  private playersKey = 'players';
  private playersSubject = new BehaviorSubject<Player[]>([]);

  delete(player: Player): Observable<boolean> {
    delete this.playersCache[player.id];
    this.players.splice(this.players.indexOf(player), 1);
    this.saveToLocalStorage();
    this.playersSubject.next(this.players.slice());
    this.numPlayers = this.players.length;

    const deleteObservable = new Observable(observer => {
      observer.next(true);
      observer.complete();
    });

    return deleteObservable;
  }

  get(id: number): Player {
    if (!this.players) {
      this.loadFromLocalStorage();
    }

    if (!this.playersCache[id]) {
      const player = this.players.filter(p => p.id === id);

      if (player.length === 1) {
        this.playersCache[id] = player[0];
      }
    }

    return this.playersCache[id];
  }

  getAll(): Observable<Player[]> {
    if (!this.players) {
      this.loadFromLocalStorage();
    }

    this.numPlayers = this.players.length;
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
      this.playersCache[player.id] = player;
    }

    this.saveToLocalStorage();
    this.numPlayers = this.players.length;
    this.playersSubject.next(this.players.slice());

    const playerObservable = new Observable(observer => {
      observer.next(player);
      observer.complete();
    });

    return playerObservable;
  }

  private initNextId() {
    if (this.players.length > 0) {
      const ids = this.players.map(player => player.id);
      this.nextId = Math.max(...ids) + 1;
    } else {
      this.nextId = 1;
    }
  }

  private loadFromLocalStorage() {
    const playersData = localStorage.getItem(this.playersKey);

    if (playersData) {
      // this.players = JSON.parse(playersData);
      const playersRawArray = JSON.parse(playersData);
      this.players = playersRawArray.map(rawPlayer => {
        return new Player(rawPlayer.id, rawPlayer.name);
      });
    } else {
      this.players = [];
      localStorage.setItem(this.playersKey, JSON.stringify(this.players));
    }

    this.initNextId();
  }

  private saveToLocalStorage() {
    const playersToLocalStorage = this.players.map(player => {
      return {
        id: player.id,
        name: player.name
      };
    });

    localStorage.setItem(this.playersKey, JSON.stringify(playersToLocalStorage));
  }
}
