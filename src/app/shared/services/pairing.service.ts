import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Pairing, Player, PlayerPreferences } from '../models';
import { PlayerService } from './player.service';

@Injectable()
export class PairingService {
  readonly pairings: Observable<Pairing[]>;
  readonly selectedPairing: Observable<Pairing>;
  readonly submittedPairings: Observable<Pairing[]>;

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

    if (round === 1) {
      const pairings = this.createRandomPairings(this.activePlayers, round);
      this._pairings = this._pairings.concat(pairings);
      this.pairingsByRoundsMap[round] = pairings;
    } else {
      const pairings = this.createWeaklyStablePairings(this.activePlayers, round, isLastRound);
      this._pairings = this._pairings.concat(pairings);
      this.pairingsByRoundsMap[round] = pairings;
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

  private createMasterListWithTies(players: Player[]): number[][] {
    const result = [];
    let prevPlayer: Player = null;
    let currentGroup: number[] = null;

    players.forEach((player: Player) => {
      if (!prevPlayer) {
        // First player.
        currentGroup = [player.id];
      } else if (player.matchPoints === prevPlayer.matchPoints) {
        // Same group as previous player.
        currentGroup.push(player.id);
      } else {
        // Player starts a new group.
        result.push(currentGroup);
        currentGroup = [player.id];
      }

      prevPlayer = player;
    });

    if (players.length % 2 === 1) {
      result.push([-1]);
    }

    return result;
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

  private createRandomPairings(players: Player[], round: number): Pairing[] {
    let table = 1;
    players = this.shufflePlayers(players);
    const pairings = [];

    while (players.length > 1) {
      const pairing = new Pairing(round, table++, players.shift(), players.shift());
      pairings.push(pairing);
    }

    if (players.length) {
      const pairing = new Pairing(round, table, players.shift(), null);
      pairings.push(pairing);
    }

    return pairings;
  }

  private createStrongStablePairings(players: Player[], round: number, isLastRound: boolean): Pairing[] {
    players = players.slice();

    if (isLastRound) {
      this.sortPlayersByTiebreakers(players);
    } else {
      this.sortPlayersByMatchPoints(players);
    }

    const masterList = this.createMasterListWithTies(players);
    const playerPreferences = new PlayerPreferences(players);
    const assignedPlayers = {};

    for (const tieGroup of masterList) {
      const availablePlayers = tieGroup.filter((playerId: number) => {
        return playerPreferences.isListNonEmpty(playerId) && !(playerId in assignedPlayers);
      });

      let availableOpps = [];

      availablePlayers.forEach((playerId: number) => {
        const oppsForPlayer = playerPreferences.getFirstTieGroupForPlayerId(playerId);
        availableOpps = availableOpps.concat(oppsForPlayer);
      });

      // TODO: Make availableOpps unique.
    }
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

        const pairing = new Pairing(round, table++, player, opponent);
        delete assignedPlayers[player.id];
        delete assignedPlayers[opponentId];
        pairings.push(pairing);
      }

      if (needsBye) {
        const pairing = new Pairing(round, table++, playerForBye, null);
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
        player2: pairing.bye ? null : pairing.player2.id,
        player1Wins: pairing.player1Wins,
        player2Wins: pairing.player2Wins,
        draws: pairing.draws,
        submitted: pairing.submitted
      };
    });

    localStorage.setItem(this.lsKeys.pairings, JSON.stringify(pairingsToLocalStorage));
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
}
