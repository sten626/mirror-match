import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map} from 'rxjs/operators';

import { Player } from '../models';

@Injectable()
export class PlayerService {

  players$ = new BehaviorSubject<Player[]>([]);

  private nextId: number;
  private players: Player[] = [];

  // readonly activePlayers: Observable<Player[]>; // Players who haven't dropped.
  // readonly numberOfActivePlayers: Observable<number>;
  // readonly numberOfDroppedPlayers: Observable<number>;
  // readonly numberOfPlayers: Observable<number>;
  // readonly players: Observable<Player[]>;
  // readonly recommendedNumberOfRounds: Observable<number>;
  // readonly selectedPlayer: Observable<Player>;

  // private nextId: number;
  // private _players: Player[];
  // private playersLookup = {};
  // private playersSubject = new BehaviorSubject<Player[]>([]);
  // private _selectedPlayer: Player;
  // private selectedPlayerSubject = new BehaviorSubject<Player>(new Player());

  private readonly lsKeys = {
    players: 'players'
  };

  constructor() {
    // this.loadFromLocalStorage();

    // // Setup Observables.
    // this.players = this.playersSubject.asObservable().pipe(distinctUntilChanged());
    // this.activePlayers = this.players.pipe(
    //   map((players: Player[]) => {
    //     return players.filter((player: Player) => !player.dropped);
    //   }),
    //   distinctUntilChanged()
    // );
    // this.numberOfActivePlayers = this.activePlayers.pipe(
    //   map((players: Player[]) => players.length),
    //   distinctUntilChanged()
    // );
    // this.numberOfPlayers = this.players.pipe(map((players: Player[]) => players.length), distinctUntilChanged());
    // this.recommendedNumberOfRounds = this.numberOfPlayers.pipe(map(num => Math.max(3, Math.ceil(Math.log2(num)))), distinctUntilChanged());
    // this.selectedPlayer = this.selectedPlayerSubject.asObservable().pipe(distinctUntilChanged());
    // this.numberOfDroppedPlayers = this.players.pipe(
    //   map((players: Player[]) => {
    //     const droppedPlayers = players.filter((player: Player) => player.dropped);
    //     return droppedPlayers.length;
    //   })
    // );

    // this.playersSubject.next(this._players.slice());
  }

  /**
   * Add a player to storage and update observable.
   * @param player The player to add to all players.
   */
  addPlayer(player: Player): void {
    player.id = this.nextId++;
    const players = this.players.slice();
    players.push(player);
    // TODO: Replace with IndexedDB.
    // TODO: Error handling.
    localStorage.setItem(this.lsKeys.players, JSON.stringify(players));
    this.next(players);
  }

  /**
   * Delete a player from storage and update the observable.
   * @param player The player to delete.
   */
  deletePlayer(player: Player): void {
    const id = player && player.id;
    const players = this.players.filter(p => p.id !== id);
    // TODO: Replace with IndexedDB.
    localStorage.setItem(this.lsKeys.players, JSON.stringify(players));
    // TODO: Error handling.
    this.next(players);
  }

  get(id: number): Player {
    if (!this.playersLookup[id]) {
      return null;
    }

    return this.playersLookup[id];
  }

  /**
   * Load players from local storage into the service.
   */
  loadPlayers(): void {
    const playersData = localStorage.getItem(this.lsKeys.players);
    let players: Player[];

    if (playersData) {
      const playersRawArray = JSON.parse(playersData);
      let maxId = 0;
      players = playersRawArray.map(rawPlayer => {
        const player = new Player(rawPlayer);

        if (player.id > maxId) {
          maxId = player.id;
        }

        // TODO: Player ID lookup?
        return player;
      });

      this.nextId = maxId + 1;
    } else {
      players = [];
      this.nextId = 1;
    }

    this.next(players);
  }

    // private initNextId() {
  //   if (this._players.length > 0) {
  //     const ids = this._players.map(player => player.id);
  //     this.nextId = Math.max(...ids) + 1;
  //   } else {
  //     this.nextId = 1;
  //   }
  // }

  // save(player: Player): void {
  //   if (!player) {
  //     throw new TypeError('No Player given for saving.');
  //   }

  //   if (!player.id) {
  //     // New player.
  //     player.id = this.nextId++;
  //     this._players.push(player);
  //   }

  //   // TODO: Save existing players?
  //   this.saveToLocalStorage();
  //   this.playersSubject.next(this._players.slice());
  // }

  // saveAll(): void {
  //   this.saveToLocalStorage();
  //   this.playersSubject.next(this._players.slice());
  // }

  /**
   * Update an already existing player in storage and update observable.
   * @param player The player to update.
   */
  updatePlayer(player: Player): void {
    const id = player && player.id;
    const players = this.players.map(p => p.id === id ? player : p);
    // TODO: Replace with IndexedDB.
    localStorage.setItem(this.lsKeys.players, JSON.stringify(players));
    // TODO: Error handling.
    this.next(players);
  }

  setSelectedPlayer(player: Player): void {
    this._selectedPlayer = player;
    this.selectedPlayerSubject.next(this._selectedPlayer);
  }

  private loadFromLocalStorage() {
    const playersData = localStorage.getItem(this.lsKeys.players);

    if (playersData) {
      const playersRawArray = JSON.parse(playersData);
      this._players = playersRawArray.map(rawPlayer => {
        const player = new Player(rawPlayer);
        this.playersLookup[rawPlayer.id] = player;
        return player;
      });
    } else {
      this._players = [];
      localStorage.setItem(this.lsKeys.players, JSON.stringify(this._players));
    }

    this.initNextId();
  }

  /**
   * Updates players cache and pushes out to the observable.
   * @param newPlayers An array of players to set.
   */
  private next(newPlayers: Player[]): void {
    this.players = newPlayers;
    this.players$.next(newPlayers);
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.lsKeys.players, JSON.stringify(this._players));
  }
}
