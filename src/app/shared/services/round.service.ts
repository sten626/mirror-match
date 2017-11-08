import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { Pairing, Player } from '../models';
import { PairingService } from './pairing.service';
import { PlayerService } from './player.service';

@Injectable()
export class RoundService {
    canBeginTournament: Observable<boolean>;
    canStartNextRound: Observable<boolean>;
    completedRounds: Observable<number[]>;
    hasBegunTournament: Observable<boolean>;
    hasCompletedRounds: Observable<boolean>;
    pairingsForSelectedRound: Observable<Pairing[]>;
    rounds: Observable<number[]>;
    selectedRound: Observable<number>;
    selectedRoundComplete: Observable<boolean>;
    selectedRoundHasPairings: Observable<boolean>;
    selectedRoundHasSubmittedPairings: Observable<boolean>;

    private _completedRounds: number[];
    private completedRoundsSubject = new BehaviorSubject<number[]>([]);
    private players: Player[];
    private _rounds: number[];
    private roundsSubject = new BehaviorSubject<number[]>([]);
    private _selectedRound: number;
    private selectedRoundSubject: BehaviorSubject<number>;
    private totalNumberOfRounds: number;

    private readonly lsKeys = {
      completedRounds: 'completedRounds',
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
      this.completedRounds = this.completedRoundsSubject.asObservable().distinctUntilChanged();
      this.hasCompletedRounds = this.completedRounds.map((rounds: number[]) => rounds.length > 0).distinctUntilChanged();
      this.hasBegunTournament = this.rounds.map((rounds: number[]) => rounds.length > 0).distinctUntilChanged();
      this._selectedRound = Math.max(...this._rounds);
      this.selectedRoundSubject = new BehaviorSubject<number>(this._selectedRound);
      this.selectedRound = this.selectedRoundSubject.asObservable().distinctUntilChanged();
      this.pairingsForSelectedRound = this.pairingService.pairings
        .combineLatest(this.selectedRound, (pairings: Pairing[], round: number) => {
          return pairings.filter((pairing: Pairing) => pairing.round === round);
        });
      this.selectedRoundHasPairings = this.pairingsForSelectedRound.map((pairings: Pairing[]) => {
        return pairings.length > 0;
      }).distinctUntilChanged();
      this.selectedRoundComplete = this.pairingsForSelectedRound.map((pairings: Pairing[]) => {
        if (pairings.length === 0) {
          return false;
        }

        return pairings
          .map((pairing: Pairing) => pairing.submitted)
          .reduce((allSubmitted: boolean, submitted: boolean) => allSubmitted && submitted);
      }).distinctUntilChanged();
      this.selectedRoundHasSubmittedPairings = this.pairingsForSelectedRound.map((pairings: Pairing[]) => {
        const submitted = pairings.filter((pairing: Pairing) => pairing.submitted);

        return submitted.length > 0;
      });
      this.canStartNextRound = this.rounds.combineLatest(this.completedRounds, (rounds: number[], completedRounds: number[]) => {
        return rounds.length === completedRounds.length;
      });

      this.playerService.players.subscribe((players: Player[]) => this.players = players);

      this.roundsSubject.next(this._rounds.slice());
      this.completedRoundsSubject.next(this._completedRounds.slice());
    }

    createNextRound(): void {
      const nextRound = this._rounds.length > 0 ? Math.max(...this._rounds) + 1 : 1;
      this._rounds.push(nextRound);
      this.saveToLocalStorage();
      this.roundsSubject.next(this._rounds.slice());
      this._selectedRound = nextRound;
      this.selectedRoundSubject.next(this._selectedRound);
    }

    markRoundAsComplete(round: number): void {
      if (!round || round < 1) {
        return;
      }

      if (this._completedRounds.indexOf(round) !== -1) {
        return;
      }

      this._completedRounds.push(round);
      this.saveToLocalStorage();
      this.completedRoundsSubject.next(this._completedRounds.slice());
    }

    markRoundAsIncomplete(round: number): void {
      if (!round || round < 1) {
        return;
      }

      const roundIndex = this._completedRounds.indexOf(round);

      if (roundIndex === -1) {
        return;
      }

      this._completedRounds.splice(roundIndex, 1);
      this.saveToLocalStorage();
      this.completedRoundsSubject.next(this._completedRounds.slice());
    }

    setSelectedRound(selectedRound: number): void {
      this._selectedRound = selectedRound;
      this.selectedRoundSubject.next(this._selectedRound);
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

      const completedRoundsData = localStorage.getItem(this.lsKeys.completedRounds);

      if (completedRoundsData) {
        this._completedRounds = JSON.parse(completedRoundsData);
      } else {
        this._completedRounds = [];
        localStorage.setItem(this.lsKeys.completedRounds, JSON.stringify(this._completedRounds));
      }
    }

    private saveToLocalStorage(): void {
      localStorage.setItem(this.lsKeys.rounds, JSON.stringify(this._rounds));
      localStorage.setItem(this.lsKeys.completedRounds, JSON.stringify(this._completedRounds));
    }
}
