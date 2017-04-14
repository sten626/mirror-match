import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { Pairing, Player } from '../models';
import { PairingService, PlayerService } from './';

@Injectable()
export class RoundService {
    canBeginTournament: Observable<boolean>;
    hasBegunTournament: Observable<boolean>;
    pairingsForSelectedRound: Observable<Pairing[]>;
    rounds: Observable<number[]>;
    selectedRound: Observable<number>;

    private players: Player[];
    private _rounds: number[];
    private roundsSubject = new BehaviorSubject<number[]>([]);
    private _selectedRound: number;
    private selectedRoundSubject: BehaviorSubject<number>;
    private totalNumberOfRounds: number;

    private readonly lsKeys = {
      rounds: 'rounds',
      totalNumberOfRounds: 'totalNumberOfRounds'
    };

    constructor(
      private pairingService: PairingService,
      private playerService: PlayerService
    ) {
      this.loadFromLocalStorage();

      // Setup Observables.
      this.canBeginTournament = this.playerService.numberOfPlayers.map((numPlayers: number) => numPlayers >= 4).distinctUntilChanged();
      this.rounds = this.roundsSubject.asObservable().distinctUntilChanged();
      this.hasBegunTournament = this.rounds.map((rounds: number[]) => rounds.length > 0).distinctUntilChanged();
      this._selectedRound = Math.max(...this._rounds);
      this.selectedRoundSubject = new BehaviorSubject<number>(this._selectedRound);
      this.selectedRound = this.selectedRoundSubject.asObservable().distinctUntilChanged();
      this.pairingsForSelectedRound = this.pairingService.pairings.map((pairings: Pairing[]) => {
        return pairings.filter((pairing: Pairing) => pairing.round === this._selectedRound);
      });
      this.playerService.players.subscribe((players: Player[]) => this.players = players);

      this.roundsSubject.next(this._rounds.slice());
    }

    clearResultsForSelectedRound(): void {
      // TODO: Working here
    }

    createNextRound(): void {
      const nextRound = this._rounds.length > 0 ? Math.max(...this._rounds) : 1;
      this._rounds.push(nextRound);
      this.saveToLocalStorage();
      this.roundsSubject.next(this._rounds.slice());
      this._selectedRound = nextRound;
      this.selectedRoundSubject.next(this._selectedRound);
    }

    createPairingsForSelectedRound(): void {
      this.pairingService.createPairings(this._selectedRound);
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
