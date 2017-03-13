import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';

import { Pairing, Player } from '../models';
import { PlayerService } from './player.service';

@Injectable()
export class PairingsService {
  private begunPairings: boolean;
  private begunPairingsSubject = new BehaviorSubject<boolean>(false);
  private pairings: Pairing[][];
  private pairingsSubject = new BehaviorSubject<Pairing[]>([]);
  private _roundsTotal: number;

  private readonly lsKeys = {
    hasBegunPairings: 'hasBegunPairings',
    pairings: 'pairings',
    roundsTotal: 'roundsTotal'
  };

  constructor(private playerService: PlayerService) {}

  beginPairings() {
    this.begunPairings = true;
    localStorage.setItem(this.lsKeys.hasBegunPairings, JSON.stringify(this.begunPairings));
    this.begunPairingsSubject.next(this.begunPairings);
  }

  canBeginPairings(): boolean {
    return this.playerService.numPlayers >= 4;
  }

  createPairings(round: number, players: Player[]): Observable<boolean> {
    if (!this.pairings) {
      this.loadPairingsFromLocalStorage();
    }

    const index = round - 1;

    if (this.pairings[index]) {
      return Observable.create(observer => observer.error(`Pairings already exist for round ${round}.`));
    }

    for (let i = players.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [players[i - 1], players[j]] = [players[j], players[i - 1]];
    }

    const pairingsForRound = [];
    let table = 1;

    while (players.length > 1) {
      const pairing = new Pairing(table++, players.shift(), players.shift());
      pairingsForRound.push(pairing);
    }

    if (players.length) {
      const pairing = new Pairing(table, players.shift(), null);
      pairingsForRound.push(pairing);
    }

    this.pairings[index] = pairingsForRound;
    this.pairingsSubject.next(pairingsForRound.slice());
    this.savePairingsToLocalStorage();

    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  get(round: number): Observable<Pairing[]> {
    if (!this.pairings) {
      this.loadPairingsFromLocalStorage();
    }

    const index = round - 1;
    let pairingsForRound;

    if (index < this.pairings.length) {
      pairingsForRound = this.pairings[index];
    } else {
      pairingsForRound = [];
    }

    this.pairingsSubject.next(pairingsForRound.slice());

    return this.pairingsSubject.asObservable().distinctUntilChanged();
  }

  hasBegunPairings(): Observable<boolean> {
    if (this.begunPairings === undefined) {
      const hasBegunPairingsData = localStorage.getItem(this.lsKeys.hasBegunPairings);

      if (hasBegunPairingsData) {
        this.begunPairings = JSON.parse(hasBegunPairingsData);
      } else {
        this.begunPairings = false;
        localStorage.setItem(this.lsKeys.hasBegunPairings, JSON.stringify(this.begunPairings));
      }
    }

    this.begunPairingsSubject.next(this.begunPairings);

    return this.begunPairingsSubject.asObservable().distinctUntilChanged();
  }

  get roundsTotal(): number {
    if (!this._roundsTotal) {
      const roundsTotalData = localStorage.getItem(this.lsKeys.roundsTotal);

      if (roundsTotalData) {
        this._roundsTotal = JSON.parse(roundsTotalData);
      } else {
        this._roundsTotal = null;
      }
    }

    return this._roundsTotal;
  }

  set roundsTotal(numRounds: number) {
    this._roundsTotal = numRounds;
    localStorage.setItem(this.lsKeys.roundsTotal, JSON.stringify(this._roundsTotal));
  }

  saveForRound(round: number, pairings: Pairing[]): Observable<Pairing[]> {
    this.pairings[round] = pairings;
    this.savePairingsToLocalStorage();
    this.pairingsSubject.next(this.pairings[round].slice());

    return new Observable(observer => {
      observer.next(this.pairings[round]);
      observer.complete();
    });
  }

  private loadPairingsFromLocalStorage() {
    const pairingsData = localStorage.getItem(this.lsKeys.pairings);

    if (pairingsData) {
      const rawPairings = JSON.parse(pairingsData);

      rawPairings.forEach((roundPairings, index) => {
        rawPairings[index] = roundPairings.map(pairing => {
          return new Pairing(
            pairing.table,
            this.playerService.get(pairing.player1),
            this.playerService.get(pairing.player2),
            pairing.player1Wins,
            pairing.player2Wins,
            pairing.draws,
            pairing.submitted);
        });
      });

      this.pairings = rawPairings;
    } else {
      this.pairings = [];
      localStorage.setItem(this.lsKeys.pairings, JSON.stringify(this.pairings));
    }
  }

  private savePairingsToLocalStorage() {
    const pairingsToLocalStorage = [];

    this.pairings.forEach(roundPairings => {
      const newRoundPairings = roundPairings.map(pairing => {
        return {
          table: pairing.table,
          player1: pairing.player1.id,
          player2: pairing.player2.id,
          player1Wins: pairing.player1Wins,
          player2Wins: pairing.player2Wins,
          draws: pairing.draws,
          submitted: pairing.submitted
        };
      });

      pairingsToLocalStorage.push(newRoundPairings);
    });

    localStorage.setItem(this.lsKeys.pairings, JSON.stringify(pairingsToLocalStorage));
  }
}
