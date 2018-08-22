import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map} from 'rxjs/operators';

import { Player } from '../models';
import { IndexedDbService } from './indexedDb.service';

@Injectable()
export class PlayerService {
  readonly activePlayers$: Observable<Player[]>; // Players who haven't dropped.
  readonly numberOfActivePlayers$: Observable<number>;
  readonly numberOfDroppedPlayers$: Observable<number>;
  readonly numberOfPlayers$: Observable<number>;
  readonly players$: Observable<Player[]>;
  readonly recommendedNumberOfRounds$: Observable<number>;
  readonly selectedPlayer$: Observable<Player>;

  private nextId: number;
  private players: Player[];
  private playersLookup = {};
  private playersSubject = new BehaviorSubject<Player[]>([]);
  // TODO move selected player to the component level.
  private selectedPlayer: Player;
  private selectedPlayerSubject = new BehaviorSubject<Player>(new Player());

  private readonly lsKeys = {
    players: 'players'
  };

  constructor(private indexedDbService: IndexedDbService) {
    this.loadFromLocalStorage();

    // Setup Observables.
    this.players$ = this.playersSubject.asObservable().pipe(distinctUntilChanged());
    this.activePlayers$ = this.players$.pipe(
      map((players: Player[]) => {
        return players.filter((player: Player) => !player.dropped);
      }),
      distinctUntilChanged()
    );
    this.numberOfActivePlayers$ = this.activePlayers$.pipe(
      map((players: Player[]) => players.length),
      distinctUntilChanged()
    );
    this.numberOfPlayers$ = this.players$.pipe(map((players: Player[]) => players.length), distinctUntilChanged());
    this.recommendedNumberOfRounds$ = this.numberOfPlayers$.pipe(
      map(num => Math.max(3, Math.ceil(Math.log2(num)))), distinctUntilChanged()
    );
    this.selectedPlayer$ = this.selectedPlayerSubject.asObservable().pipe(distinctUntilChanged());
    this.numberOfDroppedPlayers$ = this.players$.pipe(
      map((players: Player[]) => {
        const droppedPlayers = players.filter((player: Player) => player.dropped);
        return droppedPlayers.length;
      })
    );

    this.playersSubject.next(this.players.slice());
  }

  delete(player: Player): void {
    if (!player) {
      throw new TypeError('Can\'t delete when no player given.');
    }

    const playerIndex = this.players.indexOf(player);

    if (playerIndex < 0) {
      return;
    }

    this.players.splice(playerIndex, 1);
    this.saveToLocalStorage();

    if (player === this.selectedPlayer) {
      this.selectedPlayer = new Player();
      this.selectedPlayerSubject.next(this.selectedPlayer);
    }

    this.playersSubject.next(this.players.slice());
  }

  get(id: number): Player {
    if (!this.playersLookup[id]) {
      return null;
    }

    return this.playersLookup[id];
  }

  save(player: Player): void {
    if (!player) {
      throw new TypeError('No Player given for saving.');
    }

    if (!player.id) {
      // New player.
      player.id = this.nextId++;
      this.players.push(player);
    }

    // TODO: Save existing players?
    this.saveToLocalStorage();
    this.playersSubject.next(this.players.slice());
  }

  saveAll(): void {
    this.saveToLocalStorage();
    this.playersSubject.next(this.players.slice());
  }

  setSelectedPlayer(player: Player): void {
    this.selectedPlayer = player;
    this.selectedPlayerSubject.next(this.selectedPlayer);
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
    const playersData = localStorage.getItem(this.lsKeys.players);

    if (playersData) {
      const playersRawArray = JSON.parse(playersData);
      this.players = playersRawArray.map(rawPlayer => {
        const player = new Player(rawPlayer);
        this.playersLookup[rawPlayer.id] = player;
        return player;
      });
    } else {
      this.players = [];
      localStorage.setItem(this.lsKeys.players, JSON.stringify(this.players));
    }

    this.initNextId();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.lsKeys.players, JSON.stringify(this.players));
  }
}
