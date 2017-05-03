import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';

import { Pairing, Player } from '../models';
import { PlayerService } from './player.service';

@Injectable()
export class PairingService {
  pairings: Observable<Pairing[]>;
  selectedPairing: Observable<Pairing>;
  submittedPairings: Observable<Pairing[]>;

  private _pairings: Pairing[];
  private pairingsByRoundsMap: {[round: number]: Pairing[]} = {};
  private pairingsSubject = new BehaviorSubject<Pairing[]>([]);
  private players: Player[];
  private _selectedPairing: Pairing;
  private selectedPairingSubject = new BehaviorSubject<Pairing>(null);

  private readonly lsKeys = {
    pairings: 'pairings'
  };

  constructor(private playerService: PlayerService) {
    // Load data.
    this.loadFromLocalStorage();
    this.playerService.players.subscribe((players: Player[]) => this.players = players);

    // Setup Observables.
    this.pairings = this.pairingsSubject.asObservable().distinctUntilChanged();
    this.selectedPairing = this.selectedPairingSubject.asObservable().distinctUntilChanged();
    this.submittedPairings = this.pairings.map((pairings: Pairing[]) => {
      return pairings.filter((pairing: Pairing) => pairing.submitted);
    }).distinctUntilChanged();

    this.pairingsSubject.next(this._pairings.slice());
  }

  clearResults(round: number): void {
    this.pairingsByRoundsMap[round].forEach(pairing => {
      pairing.player1Wins = 0;
      pairing.player2Wins = 0;
      pairing.draws = 0;
      pairing.submitted = false;
    });

    this.saveToLocalStorage();
    this.pairingsSubject.next(this._pairings.slice());
  }

  createPairings(round: number): void {
    this.pairingsByRoundsMap[round] = [];
    const players = this.players.slice();

    // Shuffle players.
    for (let i = players.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [players[i - 1], players[j]] = [players[j], players[i - 1]];
    }

    let table = 1;

    while (players.length > 1) {
      const pairing = new Pairing(round, table++, players.shift(), players.shift());
      this._pairings.push(pairing);
      this.pairingsByRoundsMap[round].push(pairing);
    }

    if (players.length) {
      const pairing = new Pairing(round, table, players.shift(), null);
      this._pairings.push(pairing);
      this.pairingsByRoundsMap[round].push(pairing);
    }

    this.pairingsSubject.next(this._pairings.slice());
    this.saveToLocalStorage();
  }

  deletePairings(round: number): void {
    const pairingsForRound = this.pairingsByRoundsMap[round];
    delete this.pairingsByRoundsMap[round];
    this._pairings = this._pairings.filter((pairing: Pairing) => {
      return pairingsForRound.indexOf(pairing) === -1;
    });
    this.saveToLocalStorage();
    this.pairingsSubject.next(this._pairings.slice());
  }

  saveAndClearSelected(): void {
    this.saveToLocalStorage();
    this._selectedPairing = null;
    this.selectedPairingSubject.next(this._selectedPairing);
  }

  setSelectedPairing(pairing: Pairing) {
    this._selectedPairing = pairing;
    this.selectedPairingSubject.next(this._selectedPairing);
  }

  private loadFromLocalStorage() {
    const pairingsData = localStorage.getItem(this.lsKeys.pairings);

    if (pairingsData) {
      const rawPairings = JSON.parse(pairingsData);

      this._pairings = rawPairings.map(rawPairing => {
        const round = rawPairing.round;
        const pairing = new Pairing(
          round,
          rawPairing.table,
          this.playerService.get(rawPairing.player1),
          this.playerService.get(rawPairing.player2),
          rawPairing.player1Wins,
          rawPairing.player2Wins,
          rawPairing.draws,
          rawPairing.submitted
        );

        if (!this.pairingsByRoundsMap[round]) {
          this.pairingsByRoundsMap[round] = [];
        }

        this.pairingsByRoundsMap[round].push(pairing);

        return pairing;
      });
    } else {
      this._pairings = [];
      localStorage.setItem(this.lsKeys.pairings, JSON.stringify(this._pairings));
    }
  }

  private saveToLocalStorage() {
    const pairingsToLocalStorage = this._pairings.map((pairing: Pairing) => {
      return {
        round: pairing.round,
        table: pairing.table,
        player1: pairing.player1.id,
        player2: pairing.player2.id,
        player1Wins: pairing.player1Wins,
        player2Wins: pairing.player2Wins,
        draws: pairing.draws,
        submitted: pairing.submitted
      };
    });

    localStorage.setItem(this.lsKeys.pairings, JSON.stringify(pairingsToLocalStorage));
  }
}
