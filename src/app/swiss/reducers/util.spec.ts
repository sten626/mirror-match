import { Pairing, Player } from '@app/shared';
import { calculateStandings } from './util';

describe('util', () => {
  let pairings: Pairing[];
  let players: Player[];

  beforeEach(() => {
    players = [{
      id: 1,
      name: 'Steven',
      dropped: false
    }, {
      id: 2,
      name: 'Esther',
      dropped: false
    }, {
      id: 3,
      name: 'Nylea',
      dropped: false
    }, {
      id: 4,
      name: 'Jasper',
      dropped: false
    }];

    pairings = [{
      id: 1,
      table: 1,
      player1Id: 1,
      player2Id: 2,
      player1Wins: 2,
      player2Wins: 0,
      draws: 0,
      submitted: true
    }, {
      id: 2,
      table: 2,
      player1Id: 3,
      player2Id: 4,
      player1Wins: 2,
      player2Wins: 0,
      draws: 0,
      submitted: true
    }, {
      id: 3,
      table: 1,
      player1Id: 1,
      player2Id: 3,
      player1Wins: 2,
      player2Wins: 0,
      draws: 0,
      submitted: true
    }, {
      id: 4,
      table: 2,
      player1Id: 2,
      player2Id: 4,
      player1Wins: 1,
      player2Wins: 1,
      draws: 1,
      submitted: true
    }];
  });

  describe('calculateStandings', () => {
    it('should return empty list if there are no players', () => {
      const result = calculateStandings(pairings, []);
      expect(result).toEqual([]);
    });

    it('should round tiebreakers correctly', () => {
      const result = calculateStandings(pairings, players);
      expect(result[0].opponentMatchWinPercentage).toBeCloseTo(5 / 12 * 100);
      expect(result[0].opponentGameWinPercentage).toBeCloseTo(5 / 12 * 100);
      expect(result[1].opponentMatchWinPercentage).toBeCloseTo(2 / 3 * 100);
      expect(result[1].opponentGameWinPercentage).toBeCloseTo(2 / 3 * 100);
      expect(result[2].opponentMatchWinPercentage).toBeCloseTo(2 / 3 * 100);
      expect(result[2].opponentGameWinPercentage).toBeCloseTo(2 / 3 * 100);
      expect(result[3].opponentMatchWinPercentage).toBeCloseTo(5 / 12 * 100);
      expect(result[3].opponentGameWinPercentage).toBeCloseTo(5 / 12 * 100);
    });

    it('should not return NaNs for players with no opponents', () => {
      const player5: Player = {
        id: 5,
        name: 'Spike',
        dropped: false
      };
      players.push(player5);
      const pairing: Pairing = {
        id: player5.id,
        table: 0,
        player1Id: 5,
        player2Id: null,
        player1Wins: 2,
        player2Wins: 0,
        draws: 0,
        submitted: true
      };
      pairings.push(pairing);
      const results = calculateStandings(pairings, players);
      const result = results.find((standing) => standing.playerId === player5.id);
      expect(result.opponentMatchWinPercentage).toBe(0);
      expect(result.gameWinPercentage).toBe(100);
      expect(result.opponentGameWinPercentage).toBe(0);
    });
  });
});
