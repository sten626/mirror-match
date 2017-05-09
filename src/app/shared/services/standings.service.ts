import { Injectable } from '@angular/core';

import { PairingService } from './pairing.service';
import { PlayerService } from './player.service';
import { Pairing, Player } from '../';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StandingsService {
  standings: Observable<Player[]>;

  private pairings: Pairing[];
  private players: Player[];
  private playersMap: {[id: number]: Player} = {};
  private standingsSubject = new BehaviorSubject<Player[]>([]);

  constructor(
    private pairingService: PairingService,
    private playerService: PlayerService
  ) {
    this.standings = this.standingsSubject.asObservable().distinctUntilChanged();

    this.playerService.players.subscribe((players: Player[]) => {
      this.players = players;

      // Create map of players by ID.
      this.playersMap = {};
      this.players.forEach((player: Player) => {
        this.playersMap[player.id] = player;
      });
    });
    this.pairingService.submittedPairings.subscribe((pairings: Pairing[]) => {
      this.pairings = pairings;

      // Reset match and game points.
      this.players.forEach((player: Player) => {
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
      });

      // Tally match and game points.
      this.pairings.forEach((pairing: Pairing) => {
        const player1 = pairing.player1;
        const player2 = pairing.player2;
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
      this.players.forEach((player: Player) => {
        let oppMwpSum = 0;
        let oppGwpSum = 0;

        player.gameWinPercentage = Math.round(10000 * Math.max(1 / 3, player.gamePoints / (player.gamesPlayed * 3))) / 100;

        if (player.opponentIds.length > 0) {
          player.opponentIds.forEach((oppId: number) => {
            const opponent = this.playersMap[oppId];
            const opponentMwp = Math.max(1 / 3, opponent.matchPoints / (opponent.matchesPlayed * 3));
            oppMwpSum += opponentMwp;
            const opponentGwp = Math.max(1 / 3, opponent.gamePoints / (opponent.gamesPlayed * 3));
            oppGwpSum += opponentGwp;
          });

          player.opponentMatchWinPercentage = Math.round(10000 * oppMwpSum / player.opponentIds.length) / 100;
          player.opponentGameWinPercentage = Math.round(10000 * oppGwpSum / player.opponentIds.length) / 100;
        } else {
          player.opponentMatchWinPercentage = 0;
          player.opponentGameWinPercentage = 0;
        }
      });

      this.playerService.saveAll();

      this.players.sort((a: Player, b: Player) => {
        if (a.matchPoints > b.matchPoints) {
          return -1;
        } else if (a.matchPoints < b.matchPoints) {
          return 1;
        }

        if (a.opponentMatchWinPercentage > b.opponentMatchWinPercentage) {
          return -1;
        } else if (a.opponentMatchWinPercentage < b.opponentMatchWinPercentage) {
          return 1;
        }

        if (a.gameWinPercentage > b.gameWinPercentage) {
          return -1;
        } else if (a.gameWinPercentage < b.gameWinPercentage) {
          return 1;
        }

        if (a.opponentGameWinPercentage > b.opponentGameWinPercentage) {
          return -1;
        } else if (a.opponentGameWinPercentage < b.opponentGameWinPercentage) {
          return 1;
        }

        return 0;
      });

      this.standingsSubject.next(this.players.slice());
    });
  }
}
