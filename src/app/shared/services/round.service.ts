import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { combineLatest, distinctUntilChanged, map } from 'rxjs/operators';
import { Pairing } from '../models';
import { MessageService } from './message.service';
import { PairingService } from './pairing.service';
import { PlayerService } from './player.service';

@Injectable()
export class RoundService {
  readonly canBeginTournament$: Observable<boolean>;
  readonly canStartNextRound$: Observable<boolean>;
  readonly completedRounds$: Observable<number[]>;
  readonly currentRound$: Observable<number>;
  readonly hasBegunTournament$: Observable<boolean>;
  readonly hasCompletedRounds$: Observable<boolean>;
  readonly isTournamentOver$: Observable<boolean>;
  readonly outstandingPairingsForCurrentRound$: Observable<Pairing[]>;
  readonly rounds$: Observable<number[]>;

  private completedRounds: number[];
  private completedRoundsSubject$ = new BehaviorSubject<number[]>([]);
  private rounds: number[];
  private roundsSubject$ = new BehaviorSubject<number[]>([]);
  private totalNumberOfRounds: number;

  private readonly lsKeys = {
    completedRounds: 'completedRounds',
    rounds: 'rounds',
    totalNumberOfRounds: 'totalNumberOfRounds'
  };

  constructor(
    private messageService: MessageService,
    private pairingService: PairingService,
    private playerService: PlayerService
  ) {
    // Setup Observables.
    this.canBeginTournament$ = this.playerService.numberOfPlayers$.pipe(
      map((numPlayers: number) => numPlayers >= 4),
      distinctUntilChanged()
    );
    this.rounds$ = this.roundsSubject$.asObservable().pipe(distinctUntilChanged());
    this.currentRound$ = this.rounds$.pipe(
      map((rounds: number[]) => rounds[rounds.length - 1]),
      distinctUntilChanged()
    );
    this.completedRounds$ = this.completedRoundsSubject$.asObservable().pipe(distinctUntilChanged());
    this.hasCompletedRounds$ = this.completedRounds$.pipe(map((rounds: number[]) => rounds.length > 0), distinctUntilChanged());
    this.hasBegunTournament$ = this.rounds$.pipe(map((rounds: number[]) => rounds.length > 0), distinctUntilChanged());
    this.isTournamentOver$ = this.completedRounds$.pipe(
      map((rounds: number[]) => rounds.length >= this.totalNumberOfRounds),
      distinctUntilChanged()
    );
    this.outstandingPairingsForCurrentRound$ = this.pairingService.pairings$.pipe(
      combineLatest(this.currentRound$, (pairings: Pairing[], round: number) => {
        return pairings.filter((pairing: Pairing) => pairing.round === round && !pairing.submitted);
      })
    );

    this.canStartNextRound$ = this.rounds$.pipe(combineLatest(this.completedRounds$, (rounds: number[], completedRounds: number[]) => {
      return rounds.length === completedRounds.length && rounds.length < this.totalNumberOfRounds;
    }));

    this.loadFromLocalStorage();
  }

  createNextRound(): void {
    const nextRound = this.rounds.length > 0 ? Math.max(...this.rounds) + 1 : 1;
    const rounds = this.rounds.concat(nextRound);
    this.nextRounds(rounds);
  }

  getTotalNumberOfRounds(): number {
    return this.totalNumberOfRounds;
  }

  markRoundAsComplete(round: number): void {
    if (!round || round < 1) {
      return;
    }

    if (this.completedRounds.indexOf(round) !== -1) {
      return;
    }

    this.completedRounds.push(round);
    this.saveToLocalStorage();
    this.completedRoundsSubject$.next(this.completedRounds.slice());

    if (round === this.totalNumberOfRounds) {
      this.messageService.success('Last round complete. Final standings are posted.');
    }
  }

  markRoundAsIncomplete(round: number): void {
    if (!round || round < 1) {
      return;
    }

    const roundIndex = this.completedRounds.indexOf(round);

    if (roundIndex === -1) {
      return;
    }

    this.completedRounds.splice(roundIndex, 1);
    this.saveToLocalStorage();
    this.completedRoundsSubject$.next(this.completedRounds.slice());
  }

  setTotalNumberOfRounds(numberOfRounds: number): void {
    this.totalNumberOfRounds = numberOfRounds;
    localStorage.setItem(this.lsKeys.totalNumberOfRounds, JSON.stringify(this.totalNumberOfRounds));
  }

  /**
   * Get the array of completed rounds from localStorage.
   * @returns An array of the completed rounds.
   */
  private loadCompletedRounds(): number[] {
    const completedRoundsData = localStorage.getItem(this.lsKeys.completedRounds);
    let completedRounds = [];

    if (completedRoundsData) {
      completedRounds = JSON.parse(completedRoundsData);
    }

    return completedRounds;
  }

  private loadFromLocalStorage(): void {
    const rounds = this.loadRounds();
    this.nextRounds(rounds);

    const completedRounds = this.loadCompletedRounds();
    this.nextCompletedRounds(completedRounds);

    this.totalNumberOfRounds = this.loadTotalNumOfRounds();
  }

  /**
   * Get the total number of rounds for the tournament from localStorage.
   * @returns The total number of rounds for the tournament, or null if not set.
   */
  private loadTotalNumOfRounds(): number {
    const totalNumOfRoundsData = localStorage.getItem(this.lsKeys.totalNumberOfRounds);
    let totalNumOfRounds = null;

    if (totalNumOfRoundsData) {
      totalNumOfRounds = JSON.parse(totalNumOfRoundsData);
    }

    return totalNumOfRounds;
  }

  /**
   * Get the array of existing rounds from localStorage.
   * @returns An array of the existing rounds.
   */
  private loadRounds(): number[] {
    const roundsData = localStorage.getItem(this.lsKeys.rounds);
    let rounds: number[] = [];

    if (roundsData) {
      rounds = JSON.parse(roundsData);
    }

    return rounds;
  }

  /**
   * Update the existing completed rounds array in localStorage and the Observables.
   * @param newCompletedRounds The new array of completed rounds.
   */
  private nextCompletedRounds(newCompletedRounds: number[]): void {
    this.completedRounds = newCompletedRounds;
    this.saveCompletedRoundsToLocalStorage();
    this.completedRoundsSubject$.next(newCompletedRounds);
  }

  /**
   * Update the existing rounds array in localStorage and the Observables.
   * @param newRounds The new array of existing rounds.
   */
  private nextRounds(newRounds: number[]): void {
    this.rounds = newRounds;
    this.saveRoundsToLocalStorage();
    this.roundsSubject$.next(newRounds);
  }

  /**
   * Save the current value of this.completedRounds to localStorage.
   */
  private saveCompletedRoundsToLocalStorage(): void {
    localStorage.setItem(this.lsKeys.completedRounds, JSON.stringify(this.completedRounds));
  }

  /**
   * Save the current value of this.rounds to localStorage.
   */
  private saveRoundsToLocalStorage(): void {
    localStorage.setItem(this.lsKeys.rounds, JSON.stringify(this.rounds));
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.lsKeys.rounds, JSON.stringify(this.rounds));
    localStorage.setItem(this.lsKeys.completedRounds, JSON.stringify(this.completedRounds));
  }
}
