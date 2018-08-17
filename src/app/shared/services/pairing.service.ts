import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Pairing, Player } from '../models';

@Injectable()
export class PairingService {
  readonly ongoingPairingsCount$: Observable<number>;
  readonly pairings$: Observable<Pairing[]>;
  readonly submittedPairings$: Observable<Pairing[]>;
  // readonly pairings: Observable<Pairing[]>;
  // readonly selectedPairing: Observable<Pairing>;
  // readonly submittedPairings: Observable<Pairing[]>;

  // private _pairings: Pairing[];
  // private pairingsByRoundsMap: {[round: number]: Pairing[]} = {};
  // private pairingsSubject = new BehaviorSubject<Pairing[]>([]);
  // private activePlayers: Player[];
  // private _selectedPairing: Pairing;
  // private selectedPairingSubject = new BehaviorSubject<Pairing>(null);

  private pairings: Pairing[] = [];
  private pairingsByRoundMap: {[round: number]: Pairing[]} = {};
  private pairingsSubject$ = new BehaviorSubject<Pairing[]>(this.pairings);

  private readonly lsKeys = {
    pairings: 'pairings'
  };

  constructor() {
    this.pairings$ = this.pairingsSubject$.asObservable();

    this.ongoingPairingsCount$ = this.pairings$.pipe(
      map((pairings: Pairing[]) => {
        return pairings.filter((pairing: Pairing) => !pairing.submitted).length;
      }),
      distinctUntilChanged()
    );

    this.submittedPairings$ = this.pairings$.pipe(
      map((pairings: Pairing[]) => {
        return pairings.filter((p: Pairing) => p.submitted);
      })
    );
  }

  clearResultsForRound(round: number) {
    const newPairings = this.pairings.map((pairing: Pairing) => {
      if (pairing.round === round) {
        pairing.player1Wins = 0;
        pairing.player2Wins = 0;
        pairing.draws = 0;
        pairing.submitted = false;
      }

      return pairing;
    });

    localStorage.setItem(this.lsKeys.pairings, JSON.stringify(newPairings));
    this.next(newPairings);
  }

  createPairings(players: Player[], round: number, isLastRound: boolean): void {
    if (players.length < 1) {
      throw new Error('Trying to create pairings with zero active players.');
    }

    if (round === 1) {
      const pairings = this.createRandomPairings(players, round);
      this.pairings = this.pairings.concat(pairings);
      this.pairingsByRoundMap[round] = pairings;
    } else {
      const pairings = this.createWeaklyStablePairings(players, round, isLastRound);
      this.pairings = this.pairings.concat(pairings);
      this.pairingsByRoundMap[round] = pairings;
    }

    localStorage.setItem(this.lsKeys.pairings, JSON.stringify(this.pairings));
    this.next(this.pairings);
  }

  deletePairingsForRound(round: number): void {
    const newPairings = this.pairings.filter((pairing: Pairing) => pairing.round !== round);
    localStorage.setItem(this.lsKeys.pairings, JSON.stringify(newPairings));
    this.next(newPairings);
  }

  // deletePairings(round: number): void {
  //   const pairingsForRound = this.pairingsByRoundsMap[round];
  //   delete this.pairingsByRoundsMap[round];
  //   this._pairings = this._pairings.filter((pairing: Pairing) => {
  //     return pairingsForRound.indexOf(pairing) === -1;
  //   });
  //   this.saveToLocalStorage();
  //   this.pairingsSubject.next(this._pairings.slice());
  // }

  /**
   * Get an observable of pairings for a given round.
   * @param round The round number to get pairings for.
   */
  // getPairingsForRound(round: number): Observable<Pairing[]> {
  //   return this.pairingsSubject$.pipe(
  //     map((pairings: Pairing[]) => {
  //       return pairings.filter(p => p.round === round);
  //     })
  //   );
  // }

  /**
   * Loading pairings from storage.
   */
  loadPairings(): void {
    // TODO: Replace with indexedDB.
    const pairingsData = localStorage.getItem(this.lsKeys.pairings);

    if (pairingsData) {
      const pairings = JSON.parse(pairingsData);
      this.next(pairings);
    }
  }

  submitPairing(pairing: Pairing): boolean {
    this.updatePairing(pairing);
    const round = pairing.round;
    const pairings = this.pairings.filter((p: Pairing) => {
      return p.round = round;
    });

    for (const p of pairings) {
      if (!p.submitted) {
        return false;
      }
    }

    return true;
  }

  /**
   * Update a pairing in storage and emit the updated observable.
   * @param pairing The pairing to update.
   */
  updatePairing(pairing: Pairing): void {
    const pairings = this.pairings.map(p => p === pairing ? pairing : p);
    // TODO: Move to indexedDB.
    localStorage.setItem(this.lsKeys.pairings, JSON.stringify(pairings));
    this.next(pairings);
  }

  private createRandomPairings(players: Player[], round: number): Pairing[] {
    let table = 1;
    players = this.shufflePlayers(players);
    const pairings: Pairing[] = [];

    while (players.length > 1) {
      const pairing = {
        round: round,
        table: table++,
        player1: players.shift(),
        player2: players.shift()
      };

      pairings.push(pairing);
    }

    if (players.length) {
      const pairing = {
        round: round,
        table: table,
        player1: players.shift(),
        player2: null,
        player1Wins: 2,
        bye: true,
        submitted: true
      };
      pairings.push(pairing);
    }

    return pairings;
  }

  private createWeaklyStablePairings(players: Player[], round: number, isLastRound: boolean): Pairing[] {
    players = this.shufflePlayers(players);

    if (isLastRound) {
      this.sortPlayersByTiebreakers(players);
    } else {
      this.sortPlayersByMatchPoints(players);
    }

    // If there are an odd number of players, pull out the bottom player and continue with an even number.
    const needsBye = players.length % 2 === 1;
    let playerForBye: Player = null;

    if (needsBye) {
      playerForBye = players.pop();
    }

    const playerPreferenceMap = this.createPlayerPreferenceMap(players);
    let assignedPlayersCount = 0;
    const assignedPlayers = {};
    const playersById = {};

    for (const player of players) {
      const playerId = player.id;
      playersById[playerId] = player;
      if (!(playerId in assignedPlayers) && playerPreferenceMap[playerId].length > 0) {
        let assignedOppId: number = null;

        for (const oppId of playerPreferenceMap[playerId]) {
          if (!(oppId in assignedPlayers)) {
            assignedOppId = oppId;
            break;
          }
        }

        if (!assignedOppId) {
          continue;
        }

        assignedPlayers[playerId] = assignedOppId;
        assignedPlayers[assignedOppId] = playerId;
        assignedPlayersCount += 2;
      }
    }

    if (assignedPlayersCount >= players.length) {
      // Everyone was paired.
      const pairings = [];
      let table = 1;

      for (const player of players) {
        if (!(player.id in assignedPlayers)) {
          continue;
        }

        const opponentId = assignedPlayers[player.id];
        let opponent: Player;

        if (opponentId > 0) {
          opponent = playersById[opponentId];
        } else {
          opponent = null;
        }

        const pairing = {
          round: round,
          table: table++,
          player1: player,
          player2: opponent
        };

        delete assignedPlayers[player.id];
        delete assignedPlayers[opponentId];
        pairings.push(pairing);
      }

      if (needsBye) {
        const pairing = {
          round: round,
          table: table++,
          player1: playerForBye,
          player2: null,
          player1Wins: 2,
          bye: true,
          submitted: true
        };

        pairings.push(pairing);
      }

      return pairings;
    } else {
      // Bad matching. Try again.
      if (needsBye) {
        players.push(playerForBye);
      }

      return this.createWeaklyStablePairings(players, round, isLastRound);
    }
  }

  private createPlayerPreferenceMap(players: Player[]): {[playerId: number]: number[]} {
    if (players.length % 2 === 1) {
      throw new Error('Creating player preference map expects an even number of players.');
    }

    const playerPreferenceMap = {};

    players.forEach((player: Player) => {
      const potentialOpps = [];

      players.forEach((opp: Player) => {
        if (player !== opp && player.opponentIds.indexOf(opp.id) === -1) {
          potentialOpps.push(opp.id);
        }
      });

      playerPreferenceMap[player.id] = potentialOpps;
    });

    return playerPreferenceMap;
  }

  /**
   * Set a new array of pairings to the cache and push to observables.
   * @param newPairings An array of pairings to set.
   */
  private next(newPairings: Pairing[]): void {
    this.pairings = newPairings;
    this.pairingsSubject$.next(newPairings);
  }

  private shufflePlayers(players: Player[]): Player[] {
    const shuffledPlayers = players.slice();

    for (let i = shuffledPlayers.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [shuffledPlayers[i - 1], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i - 1]];
    }

    return shuffledPlayers;
  }

  private sortPlayersByMatchPoints(players: Player[]) {
    players.sort((a: Player, b: Player) => {
      return b.matchPoints - a.matchPoints;
    });
  }

  private sortPlayersByTiebreakers(players: Player[]) {
    players.sort((a: Player, b: Player) => {
      if (a.matchPoints !== b.matchPoints) {
        return b.matchPoints - a.matchPoints;
      }

      if (a.opponentMatchWinPercentage !== b.opponentMatchWinPercentage) {
        return b.opponentMatchWinPercentage - a.opponentMatchWinPercentage;
      }

      if (a.gameWinPercentage !== b.gameWinPercentage) {
        return b.gameWinPercentage - a.gameWinPercentage;
      }

      if (a.opponentGameWinPercentage !== b.opponentGameWinPercentage) {
        return b.opponentGameWinPercentage - a.opponentGameWinPercentage;
      }

      return 0;
    });
  }

  // constructor(private playerService: PlayerService) {
  //   // Load data.
  //   this.loadFromLocalStorage();
  //   this.playerService.activePlayers.subscribe((players: Player[]) => this.activePlayers = players);

  //   // Setup Observables.
  //   this.pairings = this.pairingsSubject.asObservable().pipe(distinctUntilChanged());
  //   this.selectedPairing = this.selectedPairingSubject.asObservable().pipe(distinctUntilChanged());
  //   this.submittedPairings = this.pairings.pipe(map((pairings: Pairing[]) => {
  //     return pairings.filter((pairing: Pairing) => pairing.submitted);
  //   }), distinctUntilChanged());

  //   this.pairingsSubject.next(this._pairings.slice());
  // }

  // clearResults(round: number): void {
  //   this.pairingsByRoundsMap[round].forEach(pairing => {
  //     pairing.player1Wins = 0;
  //     pairing.player2Wins = 0;
  //     pairing.draws = 0;
  //     pairing.submitted = false;
  //   });

  //   this.saveToLocalStorage();
  //   this.pairingsSubject.next(this._pairings.slice());
  // }



  // saveAndClearSelected(): void {
  //   this.saveToLocalStorage();
  //   this._selectedPairing = null;
  //   this.selectedPairingSubject.next(this._selectedPairing);
  //   this.pairingsSubject.next(this._pairings.slice());
  // }

  // setSelectedPairing(pairing: Pairing) {
  //   this._selectedPairing = pairing;
  //   this.selectedPairingSubject.next(this._selectedPairing);
  // }





  // private saveToLocalStorage() {
  //   const pairingsToLocalStorage = this._pairings.map((pairing: Pairing) => {
  //     return {
  //       round: pairing.round,
  //       table: pairing.table,
  //       player1: pairing.player1.id,
  //       player2: pairing.bye ? null : pairing.player2.id,
  //       player1Wins: pairing.player1Wins,
  //       player2Wins: pairing.player2Wins,
  //       draws: pairing.draws,
  //       submitted: pairing.submitted
  //     };
  //   });

  //   localStorage.setItem(this.lsKeys.pairings, JSON.stringify(pairingsToLocalStorage));
  // }
}
