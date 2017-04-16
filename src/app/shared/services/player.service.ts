import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';

import { Player } from '../models';

@Injectable()
export class PlayerService {
  numberOfPlayers: Observable<number>;
  players: Observable<Player[]>;
  recommendedNumberOfRounds: Observable<number>;
  selectedPlayer: Observable<Player>;

  private nextId: number;
  private _players: Player[];
  private playersLookup = {};
  private playersSubject = new BehaviorSubject<Player[]>([]);
  private _selectedPlayer: Player;
  private selectedPlayerSubject = new BehaviorSubject<Player>(new Player());

  private readonly lsKeys = {
    players: 'players'
  };

  constructor() {
    this.loadFromLocalStorage();

    // Setup Observables.
    this.players = this.playersSubject.asObservable().distinctUntilChanged();
    this.numberOfPlayers = this.players.map((players: Player[]) => players.length).distinctUntilChanged();
    this.recommendedNumberOfRounds = this.numberOfPlayers.map(num => Math.max(3, Math.ceil(Math.log2(num)))).distinctUntilChanged();
    this.selectedPlayer = this.selectedPlayerSubject.asObservable().distinctUntilChanged();

    this.playersSubject.next(this._players.slice());
  }

  delete(player: Player): void {
    if (player) {
      const playerIndex = this._players.indexOf(player);
      this._players.splice(playerIndex, 1);
      this.saveToLocalStorage();

      if (player === this._selectedPlayer) {
        this._selectedPlayer = new Player();
        this.selectedPlayerSubject.next(this._selectedPlayer);
      }

      this.playersSubject.next(this._players.slice());
    }
  }

  get(id: number): Player {
    if (!this.playersLookup[id]) {
      return null;
    }

    return this.playersLookup[id];
  }

  save(player: Player): void {
    if (!player.id) {
      // New player.
      player.id = this.nextId++;
      this._players.push(player);
    }

    // TODO: Save existing players?
    this.saveToLocalStorage();
    this.playersSubject.next(this._players.slice());
  }

  setSelectedPlayer(player: Player): void {
    this._selectedPlayer = player;
    this.selectedPlayerSubject.next(this._selectedPlayer);
  }

  private initNextId() {
    if (this._players.length > 0) {
      const ids = this._players.map(player => player.id);
      this.nextId = Math.max(...ids) + 1;
    } else {
      this.nextId = 1;
    }
  }

  private loadFromLocalStorage() {
    const playersData = localStorage.getItem(this.lsKeys.players);

    if (playersData) {
      const playersRawArray = JSON.parse(playersData);
      this._players = playersRawArray.map(rawPlayer => {
        const player = new Player(rawPlayer.id, rawPlayer.name);
        this.playersLookup[rawPlayer.id] = player;
        return player;
      });
    } else {
      this._players = [];
      localStorage.setItem(this.lsKeys.players, JSON.stringify(this._players));
    }

    this.initNextId();
  }

  private saveToLocalStorage() {
    const playersToLocalStorage = this._players.map(player => {
      return {
        id: player.id,
        name: player.name
      };
    });

    localStorage.setItem(this.lsKeys.players, JSON.stringify(playersToLocalStorage));
  }
}
