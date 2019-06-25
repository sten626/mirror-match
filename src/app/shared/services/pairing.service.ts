import { Injectable } from '@angular/core';
import { Pairing, Standing } from 'app/shared/models';
import { standingsMatchPointComparator, standingsTiebreakerComparator } from 'app/shared/services/standings.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class PairingService {
  // readonly pairings$: Observable<Pairing[]>;
  // readonly submittedPairings$: Observable<Pairing[]>;

  // private pairings: Pairing[];
  // private pairingsByRoundsMap: {[round: number]: Pairing[]} = {};
  // private pairingsSubject$ = new BehaviorSubject<Pairing[]>([]);
  // private activePlayers: Player[];

  // private readonly lsKeys = {
  //   pairings: 'pairings'
  // };

  // constructor() {
  //   // this.playerService.activePlayers$.subscribe((players: Player[]) => this.activePlayers = players);

  //   // // Setup Observables.
  //   // this.pairings$ = this.pairingsSubject$.asObservable();
  //   // this.submittedPairings$ = this.pairings$.pipe(map((pairings: Pairing[]) => {
  //   //   return pairings.filter((pairing: Pairing) => pairing.submitted);
  //   // }), distinctUntilChanged());

  //   // this.loadFromLocalStorage();
  // }

  createPairings(roundId: number, isLastRound: boolean, activePlayerStandings: Standing[], nextId: number): Observable<Pairing[]> {
    const shuffledStandings = this.shuffleStandings(activePlayerStandings);

    if (roundId === 1) {
      const pairings = this.createRandomPairings(shuffledStandings, nextId);
      return of(pairings);
    } else {
      const pairings = this.createWeaklyStablePairings(shuffledStandings, isLastRound, nextId);
      return of(pairings);
    }
  }

  // createPairings(round: number, isLastRound: boolean): void {
  //   // TODO Make sure pairings don't already exist for given round. Add unit test.
  //   if (this.activePlayers.length < 1) {
  //     throw new Error('Trying to create pairings with zero active players.');
  //   }

  //   let pairings: Pairing[] = null;

  //   if (round === 1) {
  //     pairings = this.createRandomPairings(this.activePlayers, round);
  //     this.pairingsByRoundsMap[round] = pairings;
  //   } else {
  //     pairings = this.createWeaklyStablePairings(this.activePlayers, round, isLastRound);
  //     this.pairingsByRoundsMap[round] = pairings;
  //   }

  //   this.next(pairings);
  // }

  // deletePairings(round: number): void {
  //   const pairingsForRound = this.pairingsByRoundsMap[round];
  //   delete this.pairingsByRoundsMap[round];

  //   const pairings = this.pairings.filter((pairing: Pairing) => {
  //     return pairingsForRound.indexOf(pairing) === -1;
  //   });

  //   this.next(pairings);
  // }

  // getPairingsForRound(round: number): Observable<Pairing[]> {
  //   return this.pairings$.pipe(
  //     map((pairings: Pairing[]) => {
  //       return pairings.filter(p => p.round === round);
  //     })
  //   );
  // }

  // updatePairing(pairing: Pairing): void {
  //   const pairings = this.pairings.map(p => p === pairing ? pairing : p);
  //   this.next(pairings);
  // }

  // updatePairings(updatedPairings: Pairing[]): void {
  //   const pairings = [];

  //   for (const pairing of this.pairings) {
  //     const i = updatedPairings.indexOf(pairing);

  //     if (i >= 0) {
  //       pairings.push(updatedPairings[i]);
  //     } else {
  //       pairings.push(pairing);
  //     }
  //   }

  //   this.next(pairings);
  // }

  private createRandomPairings(standings: Standing[], nextId: number): Pairing[] {
    const playerIds = standings.map(s => s.playerId);
    const pairings = [];
    let table = 1;

    while (playerIds.length > 1) {
      const pairing: Pairing = {
        id: nextId++,
        table: table++,
        player1Id: playerIds.shift(),
        player2Id: playerIds.shift(),
        player1Wins: 0,
        player2Wins: 0,
        draws: 0,
        submitted: false
      };
      pairings.push(pairing);
    }

    if (playerIds.length) {
      const pairing: Pairing = {
        id: nextId++,
        table: 0,
        player1Id: playerIds.shift(),
        player2Id: null,
        player1Wins: 2,
        player2Wins: 0,
        draws: 0,
        submitted: true
      };
      pairings.unshift(pairing);
    }

    return pairings;
  }

  private createWeaklyStablePairings(standings: Standing[], isLastRound: boolean, nextId: number): Pairing[] {
    const pairings = [];
    const comparator = isLastRound ? standingsTiebreakerComparator : standingsMatchPointComparator;
    const sortedStandings = standings.sort(comparator);
    const needsBye = sortedStandings.length % 2 === 1;

    if (needsBye) {
      const standing = sortedStandings.pop();
      const pairing: Pairing = {
        id: nextId++,
        table: 0,
        player1Id: standing.playerId,
        player2Id: null,
        player1Wins: 2,
        player2Wins: 0,
        draws: 0,
        submitted: true
      };
      pairings.push(pairing);
    }

    return pairings.concat(this.pairPlayers(sortedStandings, nextId));
  }

  // private createWeaklyStablePairings(players: Player[], round: number, isLastRound: boolean): Pairing[] {


  //   // const playerPreferenceMap = this.createPlayerPreferenceMap(players);
  //   // const assignedPlayers = {};
  //   // const playersById = {};

  //   // players.forEach(p => playersById[p.id] = p);
  //   // const result = this.pairPlayers(players.slice(), playerPreferenceMap, assignedPlayers);

  //   // if (result) {
  //   //   // Everyone was paired.
  //   //   const pairings = [];
  //   //   let table = 1;

  //   //   for (const player of players) {
  //   //     if (!(player.id in assignedPlayers)) {
  //   //       continue;
  //   //     }

  //   //     const opponentId = assignedPlayers[player.id];
  //   //     let opponent: Player;

  //   //     if (opponentId > 0) {
  //   //       opponent = playersById[opponentId];
  //   //     } else {
  //   //       opponent = null;
  //   //     }

  //   //     const pairing = new Pairing(round, table++, player, opponent);
  //   //     delete assignedPlayers[player.id];
  //   //     delete assignedPlayers[opponentId];
  //   //     pairings.push(pairing);
  //   //   }

  //   //   if (needsBye) {
  //   //     const pairing = new Pairing(round, table++, playerForBye, null);
  //   //     pairings.push(pairing);
  //   //   }

  //   //   return pairings;
  //   // } else {
  //   //   throw new Error('Pairings went terribly wrong.');
  //   // }
  // }

  // private loadFromLocalStorage(): void {
  //   // const pairingsData = localStorage.getItem(this.lsKeys.pairings);
  //   // let pairings = [];

  //   // if (pairingsData) {
  //   //   const rawPairings = JSON.parse(pairingsData);

  //   //   pairings = rawPairings.map(rawPairing => {
  //   //     const round = rawPairing.round;
  //   //     const pairing = new Pairing(
  //   //       round,
  //   //       rawPairing.table,
  //   //       this.playerService.get(rawPairing.player1),
  //   //       this.playerService.get(rawPairing.player2),
  //   //       rawPairing.player1Wins,
  //   //       rawPairing.player2Wins,
  //   //       rawPairing.draws,
  //   //       rawPairing.submitted
  //   //     );

  //   //     if (!this.pairingsByRoundsMap[round]) {
  //   //       this.pairingsByRoundsMap[round] = [];
  //   //     }

  //   //     this.pairingsByRoundsMap[round].push(pairing);

  //   //     return pairing;
  //   //   });
  //   // }

  //   // this.next(pairings);
  // }

  // private next(newPairings: Pairing[]): void {
  //   this.pairings = newPairings;
  //   this.saveToLocalStorage();
  //   this.pairingsSubject$.next(newPairings);
  // }

  private pairPlayers(standings: Standing[], nextId: number): Pairing[] {
    const pairings: Pairing[] = [];
    const table = 1;
    const result = this.pairPlayersInner(standings, pairings, nextId, table);

    if (result === null) {
      throw new Error('Something went wrong when trying to create pairings.');
    }

    return result;
  }

  private pairPlayersInner(standings: Standing[], pairings: Pairing[], nextId: number, table: number): Pairing[] {
    if (standings.length === 0) {
      return pairings;
    }

    const [standing, ...potentialOpps] = standings;
    const {playerId} = standing;

    for (const potentialOpp of potentialOpps) {
      const oppId = potentialOpp.playerId;

      if (standing.opponentIds.includes(oppId)) {
        continue;
      }

      const newPairings = [...pairings, {
        id: nextId,
        table: table,
        player1Id: playerId,
        player2Id: oppId,
        player1Wins: 0,
        player2Wins: 0,
        draws: 0,
        submitted: false
      } as Pairing];

      const newStandings = potentialOpps.filter(o => o.playerId !== oppId);
      const result = this.pairPlayersInner(newStandings, newPairings, nextId + 1, table + 1);

      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  /**
   * Recursive function for pairing players. Removes players from players list and updated assignedPlayers in place.
   * @param players List of players that still need to be paired.
   * @param playerPreferenceMap The map of lists of player pairing preferences.
   * @param assignedPlayers A mapping of players that have been paired.
   * @returns True if players given have been paired successfully, false otherwise.
   */
  // private pairPlayers(
  //   players: Player[],
  //   playerPreferenceMap: {[playerId: number]: number[]},
  //   assignedPlayers: {[playerId: number]: number}
  // ): boolean {
  //   if (players.length === 0) {
  //     return true;
  //   }

  //   const player = players.shift();
  //   const playerId = player.id;

  //   if (!(playerId in assignedPlayers)) {
  //     const playersPreferenceList = playerPreferenceMap[playerId];

  //     for (const oppId of playersPreferenceList) {
  //       if (!(oppId in assignedPlayers)) {
  //         assignedPlayers[playerId] = oppId;
  //         // assignedPlayers[oppId] = playerId;
  //         const result = this.pairPlayers(players, playerPreferenceMap, assignedPlayers);

  //         if (result) {
  //           return result;
  //         }

  //         delete assignedPlayers[playerId];
  //         delete assignedPlayers[oppId];
  //       }
  //     }
  //   } else {
  //     const result = this.pairPlayers(players, playerPreferenceMap, assignedPlayers);

  //     if (result) {
  //       return result;
  //     }
  //   }

  //   players.unshift(player);
  //   return false;
  // }

  // private saveToLocalStorage() {
  //   // const pairingsToLocalStorage = this.pairings.map((pairing: Pairing) => {
  //   //   return {
  //   //     round: pairing.round,
  //   //     table: pairing.table,
  //   //     player1: pairing.player1.id,
  //   //     player2: pairing.bye ? null : pairing.player2.id,
  //   //     player1Wins: pairing.player1Wins,
  //   //     player2Wins: pairing.player2Wins,
  //   //     draws: pairing.draws,
  //   //     submitted: pairing.submitted
  //   //   };
  //   // });

  //   // localStorage.setItem(this.lsKeys.pairings, JSON.stringify(pairingsToLocalStorage));
  // }

  private shuffleStandings(standings: Standing[]): Standing[] {
    const shuffledStandings = standings.slice();

    for (let i = shuffledStandings.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [shuffledStandings[i - 1], shuffledStandings[j]] = [shuffledStandings[j], shuffledStandings[i - 1]];
    }

    return shuffledStandings;
  }

  // private sortPlayersByMatchPoints(players: Player[]) {
  //   players = players;
  //   // players.sort((a: Player, b: Player) => {
  //   //   return b.matchPoints - a.matchPoints;
  //   // });
  // }

  // private sortPlayersByTiebreakers(players: Player[]) {
  //   players = players;
  //   // players.sort((a: Player, b: Player) => {
  //   //   if (a.matchPoints !== b.matchPoints) {
  //   //     return b.matchPoints - a.matchPoints;
  //   //   }

  //   //   if (a.opponentMatchWinPercentage !== b.opponentMatchWinPercentage) {
  //   //     return b.opponentMatchWinPercentage - a.opponentMatchWinPercentage;
  //   //   }

  //   //   if (a.gameWinPercentage !== b.gameWinPercentage) {
  //   //     return b.gameWinPercentage - a.gameWinPercentage;
  //   //   }

  //   //   if (a.opponentGameWinPercentage !== b.opponentGameWinPercentage) {
  //   //     return b.opponentGameWinPercentage - a.opponentGameWinPercentage;
  //   //   }

  //   //   return 0;
  //   // });
  // }
}
