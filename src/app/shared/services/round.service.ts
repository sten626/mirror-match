import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
// import { MessageService } from './message.service';
// import { PairingService } from './pairing.service';
// import { PlayerService } from './player.service';

@Injectable()
export class RoundService {
  readonly completedRounds$: Observable<number[]>;
  readonly currentRound$: Observable<number>;
  readonly isTournamentStarted$: Observable<boolean>;
  readonly latestCompletedRound$: Observable<number | string>;
  readonly rounds$: Observable<number[]>;
  readonly selectedRound$: Observable<number>;
  readonly totalNumOfRounds$: Observable<number>;

  private completedRounds: number[] = [];
  private completedRoundsSubject$ = new BehaviorSubject<number[]>([]);
  private rounds: number[] = [];
  private roundsSubject$ = new BehaviorSubject<number[]>([]);
  private selectedRoundSubject$ = new BehaviorSubject<number>(null);
  private totalNumOfRounds = 0;
  private totalNumOfRoundsSubject$ = new BehaviorSubject<number>(0);

  // readonly canBeginTournament: Observable<boolean>;
  // readonly canStartNextRound: Observable<boolean>;
  // readonly hasCompletedRounds: Observable<boolean>;
  // readonly isTournamentOver: Observable<boolean>;
  // readonly outstandingPairingsForCurrentRound: Observable<Pairing[]>;
  // readonly pairingsForSelectedRound: Observable<Pairing[]>;
  // readonly selectedRoundComplete: Observable<boolean>;
  // readonly selectedRoundHasPairings: Observable<boolean>;
  // readonly selectedRoundHasSubmittedPairings: Observable<boolean>;

  // private _completedRounds: number[];
  // private completedRoundsSubject = new BehaviorSubject<number[]>([]);
  // private players: Player[];
  // private _rounds: number[];
  // private roundsSubject = new BehaviorSubject<number[]>([]);
  // private _selectedRound: number;
  // private selectedRoundSubject: BehaviorSubject<number>;
  // private totalNumberOfRounds: number;

  private readonly lsKeys = {
    completedRounds: 'completedRounds',
    rounds: 'rounds',
    totalNumberOfRounds: 'totalNumberOfRounds'
  };

  constructor(
    // private messageService: MessageService,
    // private pairingService: PairingService,
    // private playerService: PlayerService
  ) {
    this.rounds$ = this.roundsSubject$.asObservable();
    this.completedRounds$ = this.completedRoundsSubject$.asObservable();
    this.selectedRound$ = this.selectedRoundSubject$.asObservable();
    this.totalNumOfRounds$ = this.totalNumOfRoundsSubject$.asObservable();

    this.currentRound$ = this.rounds$.pipe(
      map((rounds: number[]) => rounds[rounds.length - 1]),
      distinctUntilChanged()
    );
    this.isTournamentStarted$ = this.rounds$.pipe(
      map((rounds: number[]) => rounds.length > 0),
      distinctUntilChanged()
    );
    this.latestCompletedRound$ = this.completedRounds$.pipe(
      map((rounds: number[]) => {
        if (rounds.length > 0) {
          return rounds[rounds.length - 1];
        }

        return 'None';
      }),
      distinctUntilChanged()
    );

    this.loadRounds();

    // this.loadFromLocalStorage();

    // // Setup Observables.
    // this.hasCompletedRounds = this.completedRounds.pipe(map((rounds: number[]) => rounds.length > 0), distinctUntilChanged());
    // this.isTournamentOver = this.completedRounds.pipe(
    //   map((rounds: number[]) => rounds.length >= this.totalNumberOfRounds),
    //   distinctUntilChanged()
    // );
    // this._selectedRound = Math.max(...this._rounds);
    // this.selectedRoundSubject = new BehaviorSubject<number>(this._selectedRound);
    // this.selectedRound = this.selectedRoundSubject.asObservable().pipe(distinctUntilChanged());
    // this.pairingsForSelectedRound = this.pairingService.pairings.pipe(
    //   combineLatest(this.selectedRound, (pairings: Pairing[], round: number) => {
    //     return pairings.filter((pairing: Pairing) => pairing.round === round);
    //   })
    // );
    // this.outstandingPairingsForCurrentRound = this.pairingService.pairings.pipe(
    //   combineLatest(this.currentRound, (pairings: Pairing[], round: number) => {
    //     return pairings.filter((pairing: Pairing) => pairing.round === round && !pairing.submitted);
    //   })
    // );

    // this.selectedRoundHasPairings = this.pairingsForSelectedRound.pipe(
    //   map((pairings: Pairing[]) => {
    //     return pairings.length > 0;
    //   }),
    //   distinctUntilChanged()
    // );

    // this.selectedRoundComplete = this.pairingsForSelectedRound.pipe(
    //   map((pairings: Pairing[]) => {
    //     if (pairings.length === 0) {
    //       return false;
    //     }

    //     return pairings
    //       .map((pairing: Pairing) => pairing.submitted)
    //       .reduce((allSubmitted: boolean, submitted: boolean) => allSubmitted && submitted);
    //   }),
    //   distinctUntilChanged()
    // );

    // this.selectedRoundHasSubmittedPairings = this.pairingsForSelectedRound.pipe(map((pairings: Pairing[]) => {
    //   const submitted = pairings.filter((pairing: Pairing) => pairing.submitted);

    //   return submitted.length > 0;
    // }));

    // this.canStartNextRound = this.rounds.pipe(combineLatest(this.completedRounds, (rounds: number[], completedRounds: number[]) => {
    //   return rounds.length === completedRounds.length && rounds.length < this.totalNumberOfRounds;
    // }));

    // this.playerService.players.subscribe((players: Player[]) => this.players = players);

    // this.roundsSubject.next(this._rounds.slice());
    // this.completedRoundsSubject.next(this._completedRounds.slice());
  }

  /**
   * Creates a new round in the rounds array.
   * @returns The round number of the new round.
   */
  createNextRound(): number {
    const nextRound = this.rounds.length > 0 ? Math.max(...this.rounds) + 1 : 1;
    const rounds = this.rounds.slice();
    rounds.push(nextRound);
    this.nextRounds(rounds);
    localStorage.setItem(this.lsKeys.rounds, JSON.stringify(rounds));
    this.selectedRoundSubject$.next(nextRound);

    return nextRound;
    // this._rounds.push(nextRound);
    // this.saveToLocalStorage();
    // this.roundsSubject.next(this._rounds.slice());
    // this._selectedRound = nextRound;
    // this.selectedRoundSubject.next(this._selectedRound);
  }

  // getTotalNumberOfRounds(): number {
  //   return this.totalNumberOfRounds;
  // }

  loadRounds(): void {
    // TODO: Replace with IndexedDB?
    const roundsData = localStorage.getItem(this.lsKeys.rounds);
    let rounds: number[] = [];

    if (roundsData) {
      rounds = JSON.parse(roundsData);
    }

    this.nextRounds(rounds);
    this.selectedRoundSubject$.next(Math.max(...rounds));

    const completedRoundsData = localStorage.getItem(this.lsKeys.completedRounds);
    let completedRounds: number[] = [];

    if (completedRoundsData) {
      completedRounds = JSON.parse(completedRoundsData);
    }

    this.nextCompletedRounds(completedRounds);

    const totalNumOfRoundsData = localStorage.getItem(this.lsKeys.totalNumberOfRounds);
    let totalNumOfRounds: number;

    if (totalNumOfRoundsData) {
      totalNumOfRounds = JSON.parse(totalNumOfRoundsData);
    } else {
      totalNumOfRounds = 0;
    }

    this.nextTotalNumOfRounds(totalNumOfRounds);
  }

  setTotalNumOfRounds(numOfRounds: number): void {
    // TODO validation.
    this.nextTotalNumOfRounds(numOfRounds);
    localStorage.setItem(this.lsKeys.totalNumberOfRounds, JSON.stringify(numOfRounds));
  }

  /**
   * Update the currently selected round.
   * @param selectedRound The round being selected.
   */
  updateSelectedRound(selectedRound: number): void {
    this.selectedRoundSubject$.next(selectedRound);
  }

  // markRoundAsComplete(round: number): void {
  //   if (!round || round < 1) {
  //     return;
  //   }

  //   if (this._completedRounds.indexOf(round) !== -1) {
  //     return;
  //   }

  //   this._completedRounds.push(round);
  //   this.saveToLocalStorage();
  //   this.completedRoundsSubject.next(this._completedRounds.slice());

  //   if (round === this.totalNumberOfRounds) {
  //     this.messageService.success('Last round complete. Final standings are posted.');
  //   }
  // }

  // markRoundAsIncomplete(round: number): void {
  //   if (!round || round < 1) {
  //     return;
  //   }

  //   const roundIndex = this._completedRounds.indexOf(round);

  //   if (roundIndex === -1) {
  //     return;
  //   }

  //   this._completedRounds.splice(roundIndex, 1);
  //   this.saveToLocalStorage();
  //   this.completedRoundsSubject.next(this._completedRounds.slice());
  // }

  // setSelectedRound(selectedRound: number): void {
  //   this._selectedRound = selectedRound;
  //   this.selectedRoundSubject.next(this._selectedRound);
  // }

  // setTotalNumberOfRounds(numberOfRounds: number): void {
  //   this.totalNumberOfRounds = numberOfRounds;
  //   localStorage.setItem(this.lsKeys.totalNumberOfRounds, JSON.stringify(this.totalNumberOfRounds));
  // }

  /**
   * Updates completed rounds cache and pushes out to the observable.
   * @param newCompletedRounds An array of completed round numbers.
   */
  private nextCompletedRounds(newCompletedRounds: number[]): void {
    this.completedRounds = newCompletedRounds;
    this.completedRoundsSubject$.next(newCompletedRounds);
  }

  /**
   * Updates rounds cache and pushes out to the observable.
   * @param newRounds An array of round numbers to set.
   */
  private nextRounds(newRounds: number[]): void {
    this.rounds = newRounds;
    this.roundsSubject$.next(newRounds);
  }

  /**
   * Updates the total number of rounds and pushes out observable.
   * @param newTotalNumOfRounds The total number of rounds.
   */
  private nextTotalNumOfRounds(newTotalNumOfRounds: number): void {
    this.totalNumOfRounds = newTotalNumOfRounds;
    this.totalNumOfRoundsSubject$.next(newTotalNumOfRounds);
  }

  // private saveToLocalStorage(): void {
  //   localStorage.setItem(this.lsKeys.rounds, JSON.stringify(this._rounds));
  //   localStorage.setItem(this.lsKeys.completedRounds, JSON.stringify(this._completedRounds));
  // }
}
