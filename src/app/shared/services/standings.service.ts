import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PairingService } from './pairing.service';
import { PlayerService } from './player.service';
import { Pairing, Player, Standing } from '../models';

@Injectable()
export class StandingsService {
  readonly standings$: Observable<Standing[]>;

  private allSubmittedPairings: Pairing[];
  private players: Player[];
  private playersMap: {[id: number]: Player} = {};
  private standingsSubject$ = new BehaviorSubject<Standing[]>([]);

  constructor(
    private pairingService: PairingService,
    private playerService: PlayerService
  ) {
    this.standings$ = this.standingsSubject$.asObservable();

    this.playerService.players$.subscribe((players: Player[]) => {
      this.players = players.slice();

      // Create map of players by ID.
      this.playersMap = {};
      this.players.forEach((player: Player) => {
        this.playersMap[player.id] = player;
      });
    });

    this.pairingService.submittedPairings$.subscribe((pairings: Pairing[]) => {
      this.allSubmittedPairings = pairings;
    });

    this.calculateStandings();
  }

  calculateStandings(): void {
    if (this.players.length < 1) {
      return;
    }

    // TODO: Fix this
    console.log('Need to fix.');

    // Reset match and game points.
    // this.players.forEach((player: Player) => {
    //   player.matchesPlayed = 0;
    //   player.matchesWon = 0;
    //   player.matchesDrawn = 0;
    //   player.matchPoints = 0;
    //   player.gamesPlayed = 0;
    //   player.gamesWon = 0;
    //   player.gamesDrawn = 0;
    //   player.gamePoints = 0;
    //   player.byes = 0;
    //   player.opponentIds = [];
    // });

    // Tally match and game points.
    this.allSubmittedPairings.forEach((pairing: Pairing) => {
      const player1 = pairing.player1;
      const player2 = pairing.player2;
      const gamesPlayed = pairing.player1Wins + pairing.player2Wins + pairing.draws;
      player1.gamesPlayed += gamesPlayed;
      player1.gamesWon += pairing.player1Wins;
      player1.gamesDrawn += pairing.draws;
      // player1.gamePoints += pairing.player1Wins * 3 + pairing.draws;
      player1.matchesPlayed += 1;

      if (pairing.bye) {
        player1.byes += 1;
      } else {
        // player1.opponentIds.push(player2.id);
        player2.matchesPlayed += 1;
        player2.gamesPlayed += gamesPlayed;
        player2.gamesWon += pairing.player2Wins;
        player2.gamesDrawn += pairing.draws;
        // player2.gamePoints += pairing.player2Wins * 3 + pairing.draws;
        // player2.opponentIds.push(player1.id);
      }

      if (pairing.player1Wins > pairing.player2Wins) {
        if (!pairing.bye) {
          player1.matchesWon += 1;
        }

        // player1.matchPoints += 3;
      } else if (pairing.player2Wins > pairing.player1Wins) {
        player2.matchesWon += 1;
        // player2.matchPoints += 3;
      } else {
        player1.matchesDrawn += 1;
        // player1.matchPoints += 1;
        player2.matchesDrawn += 1;
        // player2.matchPoints += 1;
      }
    });

    const standings: Standing[] = [];

    // Calculate percentages.
    this.players.forEach((player: Player) => {
      // let oppMwpSum = 0;
      // let oppGwpSum = 0;

      if (player.gamesPlayed) {
        // player.gameWinPercentage = this.sigFigs(100 * player.gamePoints / (player.gamesPlayed * 3), 6);
      } else {
        // player.gameWinPercentage = 0;
      }

      // if (player.opponentIds.length > 0) {
      //   player.opponentIds.forEach((oppId: number) => {
      //     const opponent = this.playersMap[oppId];
      //     const opponentMwp = Math.max(opponent.matchPoints / (opponent.matchesPlayed * 3), 1 / 3);
      //     oppMwpSum += opponentMwp;
      //     const opponentGwp = Math.max(opponent.gamePoints / (opponent.gamesPlayed * 3), 1 / 3);
      //     oppGwpSum += opponentGwp;
      //   });

      //   player.opponentMatchWinPercentage = this.sigFigs(100 * oppMwpSum / player.opponentIds.length, 6);
      //   player.opponentGameWinPercentage = this.sigFigs(100 * oppGwpSum / player.opponentIds.length, 6);
      // } else {
      //   player.opponentMatchWinPercentage = 0;
      //   player.opponentGameWinPercentage = 0;
      // }

      // standings.push(new Standing(
      //   player.name,
      //   player.matchPoints,
      //   player.matchesPlayed,
      //   player.matchesWon,
      //   player.matchesDrawn,
      //   player.byes,
      //   player.opponentMatchWinPercentage,
      //   player.gameWinPercentage,
      //   player.opponentGameWinPercentage
      // ));
    });

    this.playerService.saveAll();

    standings.sort((a: Standing, b: Standing) => {
      if (a.matchPoints !== b.matchPoints) {
        return b.matchPoints - a.matchPoints;
      }

      if (a.opponentMatchWinPercentage !== b.opponentMatchWinPercentage) {
        return b.opponentMatchWinPercentage - a.opponentMatchWinPercentage;
      }

      if (a.gameWinPercentage !== b.gameWinPercentage) {
        return b.gameWinPercentage - a.gameWinPercentage;
      }

      return b.opponentGameWinPercentage - a.opponentGameWinPercentage;
    });

    this.next(standings);
  }

  /**
   * Loads a Standings array into the standings subject.
   * @param newStandings The new array of ordered Standings.
   */
  private next(newStandings: Standing[]): void {
    this.standingsSubject$.next(newStandings);
  }

  // private sigFigs(num: number, numOfSigFigs: number): number {
  //   const rounded = num.toPrecision(numOfSigFigs);
  //   return Number.parseFloat(rounded);
  // }
}
