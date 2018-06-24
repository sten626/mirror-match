import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Player } from '../models';

@Injectable()
export class PlayerService {
  readonly activePlayers$: Observable<Player[]>; // Players who haven't dropped.
  readonly activePlayersCount$: Observable<number>;
  readonly droppedPlayersCount$: Observable<number>;
  readonly players$: Observable<Player[]>;
  readonly playersCount$: Observable<number>;

  private nextId: number;
  private players: Player[] = [];
  private playersSubject$ = new BehaviorSubject<Player[]>([]);

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
    this.players$ = this.playersSubject$.asObservable();

    this.activePlayers$ = this.players$.pipe(
      map((players: Player[]) => {
        return players.filter((player: Player) => !player.dropped);
      })
    );
    this.activePlayersCount$ = this.activePlayers$.pipe(
      map((players: Player[]) => players.length),
      distinctUntilChanged()
    );
    this.droppedPlayersCount$ = this.players$.pipe(
      map((players: Player[]) => {
        return players.filter((player: Player) => player.dropped).length;
      }),
      distinctUntilChanged()
    );
    this.playersCount$ = this.players$.pipe(
      map((players: Player[]) => players.length),
      distinctUntilChanged()
    );
    // this.loadFromLocalStorage();

    // // Setup Observables.
    // this.recommendedNumberOfRounds = this.numberOfPlayers.pipe(map(num => Math.max(3, Math.ceil(Math.log2(num)))),
    // distinctUntilChanged());
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

  // get(id: number): Player {
  //   if (!this.playersLookup[id]) {
  //     return null;
  //   }

  //   return this.playersLookup[id];
  // }

  /**
   * Load players from local storage into the service.
   */
  loadPlayers(): void {
    const playersData = localStorage.getItem(this.lsKeys.players);
    let players: Player[];

    if (playersData) {
      players = JSON.parse(playersData);
      let maxId = 0;

      players.forEach((player: Player) => {
        if (player.id > maxId) {
          maxId = player.id;
        }
      });

      this.nextId = maxId + 1;
    } else {
      players = [];
      this.nextId = 1;
    }

    this.next(players);
  }

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

  /**
   * Updates players cache and pushes out to the observable.
   * @param newPlayers An array of players to set.
   */
  private next(newPlayers: Player[]): void {
    this.players = newPlayers;
    this.playersSubject$.next(newPlayers);
  }
}
