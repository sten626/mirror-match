import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, map } from 'rxjs/operators';

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
  private activePlayers: Player[];
  private _selectedPairing: Pairing;
  private selectedPairingSubject = new BehaviorSubject<Pairing>(null);

  private readonly lsKeys = {
    pairings: 'pairings'
  };

  constructor(private playerService: PlayerService) {
    // Load data.
    this.loadFromLocalStorage();
    this.playerService.activePlayers.subscribe((players: Player[]) => this.activePlayers = players);

    // Setup Observables.
    this.pairings = this.pairingsSubject.asObservable().pipe(distinctUntilChanged());
    this.selectedPairing = this.selectedPairingSubject.asObservable().pipe(distinctUntilChanged());
    this.submittedPairings = this.pairings.pipe(map((pairings: Pairing[]) => {
      return pairings.filter((pairing: Pairing) => pairing.submitted);
    }), distinctUntilChanged());

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

  createPairings(round: number, isLastRound: boolean): void {
    if (this.activePlayers.length < 1) {
      throw new Error('Trying to create pairings with zero active players.');
    }

    this.pairingsByRoundsMap[round] = [];
    const players = this.shufflePlayers(this.activePlayers);

    if (round === 1) {
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
    } else {
      // Phase 1
      players.sort((a: Player, b: Player) => {
        if (isLastRound) {
          if (a.matchPoints === b.matchPoints) {
            if (a.opponentMatchWinPercentage === b.opponentMatchWinPercentage) {
              if (a.gameWinPercentage === b.gameWinPercentage) {
                return b.opponentGameWinPercentage - a.opponentGameWinPercentage;
              }

              return b.gameWinPercentage - a.gameWinPercentage;
            }

            return b.opponentMatchWinPercentage - a.opponentMatchWinPercentage;
          }
        }

        return b.matchPoints - a.matchPoints;
      });

      const playerPreferenceMap = this.createPlayerPreferenceMap(players);
      this.reducePlayerPreferenceMap(playerPreferenceMap);
      let done = true;

      for (const player in playerPreferenceMap) {
        if (playerPreferenceMap[player].length > 1) {
          done = false;
        } else if (playerPreferenceMap[player].length === 0) {
          throw new Error('Player preference list should always have at least 1 opponent.');
        }
      }

      if (!done) {
        // Phase 2
        console.error('Phase 2 got hit!!');
        while (true) {
          // Identify a rotation.
          const rotation = this.findRotation(playerPreferenceMap);
          console.log(rotation);

          // Eliminate the rotation.
          this.eliminateRotation(playerPreferenceMap, rotation);

          done = true;

          for (const player in playerPreferenceMap) {
            if (playerPreferenceMap[player].length > 1) {
              done = false;
            } else if (playerPreferenceMap[player].length === 0) {
              throw new Error('Eliminating rotation has reduced a preference list to zero.');
            }
          }

          if (done) {
            break;
          }
        }
      }

      let table = 1;

      while (players.length > 0) {
        const player1 = players.shift();
        const player2Id = playerPreferenceMap[player1.id][0];
        let pairing = null;

        if (player2Id === -1) {
          // player1 got a bye.
          pairing = new Pairing(round, table++, player1, null);
        } else {
          const player2Index = players.findIndex((player: Player) => player.id === player2Id);
          const player2 = players.splice(player2Index, 1)[0];
          pairing = new Pairing(round, table++, player1, player2);
        }

        this._pairings.push(pairing);
        this.pairingsByRoundsMap[round].push(pairing);
      }
    }

    this.saveToLocalStorage();
    this.pairingsSubject.next(this._pairings.slice());
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
    this.pairingsSubject.next(this._pairings.slice());
  }

  setSelectedPairing(pairing: Pairing) {
    this._selectedPairing = pairing;
    this.selectedPairingSubject.next(this._selectedPairing);
  }

  private createPlayerPreferenceMap(players: Player[]): {[playerId: number]: number[]} {
    const playerPreferenceMap = {};
    const needsBye = players.length % 2 === 1;

    players.forEach((player: Player) => {
      const potentialOpps = players.filter((opp: Player) => {
        return player !== opp && player.opponentIds.indexOf(opp.id) === -1;
      }).map((opp: Player) => {
        return opp.id;
      });

      if (needsBye) {
        potentialOpps.push(-1);
      }

      playerPreferenceMap[player.id] = potentialOpps;
    });

    if (needsBye) {
      const potentialOpps = players.slice();
      const potentialOppIds = potentialOpps.sort((a: Player, b: Player) => {
        return a.matchPoints - b.matchPoints;
      }).map((opp: Player) => {
        return opp.id;
      });

      playerPreferenceMap[-1] = potentialOppIds;
    }

    return playerPreferenceMap;
  }

  private eliminateRotation(playerPreferenceMap: {[playerId: number]: number[]}, rotation: number[][]): void {
    for (const pair of rotation) {
      const playerAId = pair[0];
      const playerBId = pair[1];
      const playerAIdIndex = playerPreferenceMap[playerBId].indexOf(playerAId);
      playerPreferenceMap[playerBId].splice(playerAIdIndex, 1);
      const playerBIdIndex = playerPreferenceMap[playerAId].indexOf(playerBId);
      playerPreferenceMap[playerAId].splice(playerBIdIndex, 1);
    }
  }

  private findRotation(playerPreferenceMap: {[playerId: number]: number[]}): number[][] {
    // Find player with multiple opponents on reduced list.
    let player = null;
    const rotation = [];
    const playersInRotation = [];

    for (const playerId in playerPreferenceMap) {
      if (playerPreferenceMap[playerId].length > 1) {
        player = parseInt(playerId);
        break;
      }
    }

    rotation.push([player, playerPreferenceMap[player][0]]);
    playersInRotation.push(player);

    return this.findRotationNext(playerPreferenceMap, rotation, playersInRotation);
  }

  private findRotationNext(
      playerPreferenceMap: {[playerId: number]: number[]},
      rotation: number[][],
      playersInRotation: number[]): number[][] {
    const previous = rotation[rotation.length - 1];
    const previousPlayer = previous[0];
    const nextOpponent = playerPreferenceMap[previousPlayer][1];
    const nextOpponentsPreferenceList = playerPreferenceMap[nextOpponent];
    const nextPlayer = nextOpponentsPreferenceList[nextOpponentsPreferenceList.length - 1];

    if (playersInRotation.indexOf(nextPlayer) !== -1) {
      return rotation;
    }

    rotation.push([nextPlayer, nextOpponent]);
    playersInRotation.push(nextPlayer);

    return this.findRotationNext(playerPreferenceMap, rotation, playersInRotation);
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

  private reducePlayerPreferenceMap(playerPreferenceMap: {[player: number]: number[]}): void {
    const proposedToMap = {};
    const proposedToByMap = {};
    const playersToProposeStack = this.activePlayers.map((player: Player) => player.id);

    if (playersToProposeStack.length % 2 === 1) {
      playersToProposeStack.push(-1);
    }

    while (playersToProposeStack.length > 0) {
      const proposingPlayer = playersToProposeStack.pop();
      const preferences = playerPreferenceMap[proposingPlayer];

      for (let i = 0; i < preferences.length; i++) {
        // Atempt to propose to i.
        const proposedPlayer = preferences[i];
        const proposingPlayerIndex = playerPreferenceMap[proposedPlayer].indexOf(proposingPlayer);

        // Was proposedPlayer already proposed to?
        if (proposedToByMap[proposedPlayer] !== undefined && proposedToByMap[proposedPlayer] !== null) {
          // Already proposed to.
          const otherSuitor = proposedToByMap[proposedPlayer];
          const otherSuitorIndex = playerPreferenceMap[proposedPlayer].indexOf(otherSuitor);
          if (proposingPlayerIndex < otherSuitorIndex) {
            // Proposing player favoured, reject old one.
            proposedToMap[otherSuitor] = null;
            playersToProposeStack.push(otherSuitor);
            proposedToMap[proposingPlayer] = proposedPlayer;
            proposedToByMap[proposedPlayer] = proposingPlayer;
          } else {
            // Previous favoured. Reject proposingPlayer (should never happen).
            console.error('Bad state in pairing algorithm.');
          }
        } else {
          // proposedPlayer hasn't been proposed to yet.
          proposedToMap[proposingPlayer] = proposedPlayer;
          proposedToByMap[proposedPlayer] = proposingPlayer;
        }

        // Remove everyone lower than proposingPlayer on proposedPlayer's preferences.
        const removedPlayers = playerPreferenceMap[proposedPlayer].splice(proposingPlayerIndex + 1);

        // Remove proposedPlayer from the preferences of removedPlayers.
        removedPlayers.forEach((player: number) => {
          const proposedPlayerIndex = playerPreferenceMap[player].indexOf(proposedPlayer);
          playerPreferenceMap[player].splice(proposedPlayerIndex, 1);
        });

        break;
      }
    }
  }

  private saveToLocalStorage() {
    const pairingsToLocalStorage = this._pairings.map((pairing: Pairing) => {
      return {
        round: pairing.round,
        table: pairing.table,
        player1: pairing.player1.id,
        player2: pairing.bye ? null : pairing.player2.id,
        player1Wins: pairing.player1Wins,
        player2Wins: pairing.player2Wins,
        draws: pairing.draws,
        submitted: pairing.submitted
      };
    });

    localStorage.setItem(this.lsKeys.pairings, JSON.stringify(pairingsToLocalStorage));
  }

  private shufflePlayers(players: any[]): any[] {
    const shuffledPlayers = players.slice();

    for (let i = shuffledPlayers.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [shuffledPlayers[i - 1], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i - 1]];
    }

    return shuffledPlayers;
  }
}
