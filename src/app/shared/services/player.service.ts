import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map} from 'rxjs/operators';

import { Player } from '../models';

@Injectable()
export class PlayerService {
  readonly activePlayers$: Observable<Player[]>; // Players who haven't dropped.
  readonly numberOfActivePlayers$: Observable<number>;
  readonly numberOfDroppedPlayers$: Observable<number>;
  readonly numberOfPlayers$: Observable<number>;
  readonly players$: Observable<Player[]>;
  readonly recommendedNumberOfRounds$: Observable<number>;

  private nextId: number;
  private players: Player[];
  private playersById = {};
  private playersSubject$ = new BehaviorSubject<Player[]>([]);

  private readonly lsKeys = {
    players: 'players'
  };

  constructor() {
    // Setup Observables.
    this.players$ = this.playersSubject$.asObservable();

    this.activePlayers$ = this.players$.pipe(
      map((players: Player[]) => {
        return players.filter((player: Player) => !player.dropped);
      })
    );

    this.numberOfActivePlayers$ = this.activePlayers$.pipe(
      map((players: Player[]) => players.length),
      distinctUntilChanged()
    );

    this.numberOfPlayers$ = this.players$.pipe(
      map((players: Player[]) => players.length),
      distinctUntilChanged()
    );

    this.recommendedNumberOfRounds$ = this.numberOfPlayers$.pipe(
      map(num => Math.max(3, Math.ceil(Math.log2(num)))),
      distinctUntilChanged()
    );

    this.numberOfDroppedPlayers$ = this.players$.pipe(
      map((players: Player[]) => {
        const droppedPlayers = players.filter((player: Player) => player.dropped);
        return droppedPlayers.length;
      })
    );

    const newPlayers = this.loadFromLocalStorage();
    this.next(newPlayers);
  }

  /**
   * Add a player to storage and update Observables.
   * @param player The player to add.
   */
  addPlayer(player: Player): void {
    if (!player) {
      throw new TypeError('No Player given for saving.');
    }

    player.id = this.nextId++;
    const players = this.players.concat(player);
    this.next(players);
  }

  /**
   * Remove a player from storage and update Observables.
   * @param player The player delete.
   */
  deletePlayer(player: Player): void {
    if (!player) {
      throw new TypeError('Can\'t delete when no player given.');
    }

    const idToDelete = player && player.id;
    const players = this.players.filter(p => p.id !== idToDelete);
    this.next(players);
    // TODO Handle selected player being deleted.
  }

  get(id: number): Player {
    if (!this.playersById[id]) {
      return null;
    }

    return this.playersById[id];
  }

  saveAll(): void {
    this.saveToLocalStorage();
  }

  updatePlayer(player: Player): void {
    const id = player && player.id;
    const players = this.players.map(p => p.id === id ? player : p);
    this.next(players);
  }

  /**
   * Loads Players from localStorage into the cache, into the Subject, and populates the playersById map.
   * @returns An array of Players loaded from localStorage, or an empty array.
   */
  private loadFromLocalStorage(): Player[] {
    const playersData = localStorage.getItem(this.lsKeys.players);
    let players: Player[] = [];
    this.nextId = 1;

    if (playersData) {
      const playersRawArray = JSON.parse(playersData);
      players = playersRawArray.map(rawPlayer => {
        const player = new Player(rawPlayer);
        this.playersById[player.id] = player;
        this.nextId = Math.max(this.nextId, player.id + 1);
        return player;
      });
    }

    return players;
  }

  /**
   * Loads a Players array into the cache and into the Subject.
   * @param newPlayers The new array of players.
   */
  private next(newPlayers: Player[]): void {
    this.players = newPlayers;
    this.saveToLocalStorage();
    this.playersSubject$.next(newPlayers);
  }

  /**
   * Save the current Players cache into localStorage.
   */
  private saveToLocalStorage() {
    // TODO: Only save fields that need saving instead of everything on the Player object.
    localStorage.setItem(this.lsKeys.players, JSON.stringify(this.players));
  }
}
