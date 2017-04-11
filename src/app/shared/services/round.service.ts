import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { Player } from '../models';
import { PlayerService } from './';

@Injectable()
export class RoundService {
    canBeginTournament: Observable<boolean>;
    hasBegunTournament: Observable<boolean>;
    rounds: Observable<number[]>;
    selectedRound: Observable<number>;

    private players: Player[];
    private _rounds: number[];
    private roundsSubject = new BehaviorSubject<number[]>([]);
    private selectedRoundSubject: BehaviorSubject<number>;
    private totalNumberOfRounds: number;

    private readonly lsKeys = {
      rounds: 'rounds',
      totalNumberOfRounds: 'totalNumberOfRounds'
    };

    constructor(
      private playerService: PlayerService
    ) {
      this.loadFromLocalStorage();

      // Setup Observables.
      this.canBeginTournament = this.playerService.numberOfPlayers.map((numPlayers: number) => numPlayers >= 4).distinctUntilChanged();
      this.rounds = this.roundsSubject.asObservable().distinctUntilChanged();
      this.hasBegunTournament = this.rounds.map((rounds: number[]) => rounds.length > 0).distinctUntilChanged();
      this.selectedRoundSubject = new BehaviorSubject<number>(Math.max(...this._rounds));
      this.selectedRound = this.selectedRoundSubject.asObservable().distinctUntilChanged();
      this.playerService.players.subscribe((players: Player[]) => this.players = players);

      this.roundsSubject.next(this._rounds);
    }

    createNextRound(): void {
      const nextRound = this._rounds.length > 0 ? Math.max(...this._rounds) : 1;
      this._rounds.push(nextRound);
      this.saveToLocalStorage();
      this.roundsSubject.next(this._rounds.slice());
      this.selectedRoundSubject.next(nextRound);
    }

    createPairingsForSelectedRound(): void {
      const players = this.players.slice();

      // Copy and shuffle.
      for (let i = players.length; i; i--) {
        const j = Math.floor(Math.random() * i);
        [players[i - 1], players[j]] = [players[j], players[i - 1]];
      }

      // TODO: Working here.
    }

    setTotalNumberOfRounds(numberOfRounds: number): void {
      this.totalNumberOfRounds = numberOfRounds;
      localStorage.setItem(this.lsKeys.totalNumberOfRounds, JSON.stringify(this.totalNumberOfRounds));
    }

    private loadFromLocalStorage(): void {
      const roundsData = localStorage.getItem(this.lsKeys.rounds);

      if (roundsData) {
        this._rounds = JSON.parse(roundsData);
      } else {
        this._rounds = [];
        localStorage.setItem(this.lsKeys.rounds, JSON.stringify(this._rounds));
      }
    }

    private saveToLocalStorage(): void {
      localStorage.setItem(this.lsKeys.rounds, JSON.stringify(this._rounds));
    }
}
