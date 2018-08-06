import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { PairingService } from './pairing.service';
import { PlayerService } from './player.service';
import { Pairing, Player } from '../models';

@Injectable()
export class StandingsService {
  // readonly standings: Observable<Player[]>;

  // private allSubmittedPairings: Pairing[];
  // private players: Player[];
  // private playersMap: {[id: number]: Player} = {};
  // private standingsSubject = new BehaviorSubject<Player[]>([]);

  constructor(
    private pairingService: PairingService,
    private playerService: PlayerService
  ) {
    // this.standings = this.standingsSubject.asObservable().pipe(distinctUntilChanged());

    // this.playerService.players.subscribe((players: Player[]) => {
    //   this.players = players.slice();

    //   // Create map of players by ID.
    //   this.playersMap = {};
    //   this.players.forEach((player: Player) => {
    //     this.playersMap[player.id] = player;
    //   });
    // });

    // this.pairingService.submittedPairings.subscribe((pairings: Pairing[]) => {
    //   this.allSubmittedPairings = pairings;
    // });

    // this.calculateStandings();
  }

  /**
   * Calculates all the tiebreakers and standings of all players.
   * @param players An array of all players.
   * @param submittedPairings An array of all pairings submitted so far.
   * @returns Array of players ordered into standings.
   */
  getStandings(players: Player[], submittedPairings: Pairing[]): Player[] {
    if (players.length < 1) {
      return [];
    }

    const playersById = {};

    // Reset match and game points.
    players.forEach((player: Player) => {
      player.matchesPlayed = 0;
      player.matchesWon = 0;
      player.matchesDrawn = 0;
      player.matchPoints = 0;
      player.gamesPlayed = 0;
      player.gamesWon = 0;
      player.gamesDrawn = 0;
      player.gamePoints = 0;
      player.byes = 0;
      player.opponentIds = [];
      playersById[player.id] = player;
    });

    // Tally match and game points.
    submittedPairings.forEach((pairing: Pairing) => {
      // TODO: Stop storing actual player objects in pairings?
      const player1 = playersById[pairing.player1.id];
      const player2 = playersById[pairing.player2.id];
      const gamesPlayed = pairing.player1Wins + pairing.player2Wins + pairing.draws;
      player1.gamesPlayed += gamesPlayed;
      player1.gamesWon += pairing.player1Wins;
      player1.gamesDrawn += pairing.draws;
      player1.gamePoints += pairing.player1Wins * 3 + pairing.draws;
      player1.matchesPlayed += 1;

      if (pairing.bye) {
        player1.byes += 1;
      } else {
        player1.opponentIds.push(player2.id);
        player2.matchesPlayed += 1;
        player2.gamesPlayed += gamesPlayed;
        player2.gamesWon += pairing.player2Wins;
        player2.gamesDrawn += pairing.draws;
        player2.gamePoints += pairing.player2Wins * 3 + pairing.draws;
        player2.opponentIds.push(player1.id);
      }

      if (pairing.player1Wins > pairing.player2Wins) {
        if (!pairing.bye) {
          player1.matchesWon += 1;
        }

        player1.matchPoints += 3;
      } else if (pairing.player2Wins > pairing.player1Wins) {
        player2.matchesWon += 1;
        player2.matchPoints += 3;
      } else {
        player1.matchesDrawn += 1;
        player1.matchPoints += 1;
        player2.matchesDrawn += 1;
        player2.matchPoints += 1;
      }
    });

    // Calculate percentages.
    players.forEach((player: Player) => {
      let oppMwpSum = 0;
      let oppGwpSum = 0;

      if (player.gamesPlayed) {
        player.gameWinPercentage = this.sigFigs(100 * player.gamePoints / (player.gamesPlayed * 3), 6);
      } else {
        player.gameWinPercentage = 0;
      }

      if (player.opponentIds.length > 0) {
        player.opponentIds.forEach((oppId: number) => {
          const opponent = playersById[oppId];
          const opponentMwp = Math.max(opponent.matchPoints / (opponent.matchesPlayed * 3), 1 / 3);
          oppMwpSum += opponentMwp;
          const opponentGwp = Math.max(opponent.gamePoints / (opponent.gamesPlayed * 3), 1 / 3);
          oppGwpSum += opponentGwp;
        });

        player.opponentMatchWinPercentage = this.sigFigs(100 * oppMwpSum / player.opponentIds.length, 6);
        player.opponentGameWinPercentage = this.sigFigs(100 * oppGwpSum / player.opponentIds.length, 6);
      } else {
        player.opponentMatchWinPercentage = 0;
        player.opponentGameWinPercentage = 0;
      }
    });

    players.sort((a: Player, b: Player) => {
      // TODO Revisit this sorting code.
      if (a.matchPoints > b.matchPoints) {
        return -1;
      } else if (a.matchPoints < b.matchPoints) {
        return 1;
      }

      const aOMWP = Math.max(a.opponentMatchWinPercentage, 33.3333);
      const bOMWP = Math.max(b.opponentMatchWinPercentage, 33.3333);

      if (aOMWP > bOMWP) {
        return -1;
      } else if (aOMWP < bOMWP) {
        return 1;
      }

      const aGWP = Math.max(a.gameWinPercentage, 33.3333);
      const bGWP = Math.max(b.gameWinPercentage, 33.3333);

      if (aGWP > bGWP) {
        return -1;
      } else if (aGWP < bGWP) {
        return 1;
      }

      const aOGWP = Math.max(a.opponentGameWinPercentage, 33.3333);
      const bOGWP = Math.max(b.opponentGameWinPercentage, 33.3333);

      if (aOGWP > bOGWP) {
        return -1;
      } else if (aOGWP < bOGWP) {
        return 1;
      }

      return 0;
    });

    return players;
  }

  private sigFigs(num: number, numOfSigFigs: number): number {
    const rounded = num.toPrecision(numOfSigFigs);
    return Number.parseFloat(rounded);
  }
}
