import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { PlayerService } from '../services';

@Injectable()
export class RoundService {
    canBeginTournament: Observable<boolean>;
    hasBegunTournament: Observable<boolean>;
    rounds: Observable<number[]>;

    private _rounds: number[];
    private roundsSubject = new BehaviorSubject<number[]>([]);
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

      this.roundsSubject.next(this._rounds);
    }

    createNextRound(): void {
      const nextRound = this._rounds.length > 0 ? Math.max(...this._rounds) : 1;
      this._rounds.push(nextRound);
      this.saveToLocalStorage();
      this.roundsSubject.next(this._rounds.slice());
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
