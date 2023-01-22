import { Dictionary } from '@ngrx/entity';
import { Pairing, Player, Standing, standingDefaults } from 'app/shared';

export function calculateStandings(
  pairings: Pairing[],
  players: Player[]
): Standing[] {
  if (players.length === 0) {
    return [];
  }

  const standings = aggregatePlayerMatchData(pairings, players);
  calculatePlayerWinData(players, standings);
  calculateOpponentWinData(players, standings);

  return getStandingsList(players, standings);
}

function aggregatePlayerMatchData(
  pairings: Pairing[],
  players: Player[]
): Dictionary<Standing> {
  const standings: Dictionary<Standing> = {};

  players.forEach((player) => {
    standings[player.id!] = {
      ...standingDefaults,
      playerId: player.id!,
      opponentIds: [],
    };
  });

  pairings.forEach((pairing) => {
    const { draws, player1Id, player1Wins, player2Id, player2Wins } = pairing;
    const player1Standing = standings[player1Id] as Standing;
    player1Standing.matchesPlayed += 1;
    player1Standing.gamesWon += player1Wins;
    player1Standing.gamesLost += player2Wins;
    player1Standing.gamesDrawn += draws;

    if (player2Id) {
      player1Standing.opponentIds.push(player2Id);

      const player2Standing = standings[player2Id] as Standing;
      player2Standing.opponentIds.push(player1Id);
      player2Standing.matchesPlayed += 1;
      player2Standing.gamesWon += player2Wins;
      player2Standing.gamesLost += player1Wins;
      player2Standing.gamesDrawn += draws;

      if (player1Wins > player2Wins) {
        player1Standing.matchesWon += 1;
      } else if (player2Wins > player1Wins) {
        player2Standing.matchesWon += 1;
      } else {
        player1Standing.matchesDrawn += 1;
        player2Standing.matchesDrawn += 1;
      }
    } else {
      player1Standing.byes += 1;
      player1Standing.matchesWon += 1;
    }
  });

  return standings;
}

function calculateOpponentWinData(
  players: Player[],
  standings: Dictionary<Standing>
) {
  players.forEach((player) => {
    const standing = standings[player.id!] as Standing;
    const totalOpponents = standing.opponentIds.length;

    if (totalOpponents === 0) {
      standing.opponentGameWinPercentage = 0;
      standing.opponentMatchWinPercentage = 0;
      return;
    }

    let opponentGameWinPercentageSum = 0;
    let opponentMatchWinPercentageSum = 0;

    standing.opponentIds.forEach((opponentId) => {
      const opponentStanding = standings[opponentId] as Standing;
      opponentGameWinPercentageSum += opponentStanding.gameWinPercentage;
      opponentMatchWinPercentageSum += opponentStanding.matchWinPercentage;
    });

    standing.opponentGameWinPercentage = sigFigs(
      opponentGameWinPercentageSum / totalOpponents,
      6
    );
    standing.opponentMatchWinPercentage = sigFigs(
      opponentMatchWinPercentageSum / totalOpponents,
      6
    );
  });
}

function calculatePlayerWinData(
  players: Player[],
  standings: Dictionary<Standing>
) {
  const minimum = 1 / 3;

  players.forEach((player) => {
    const standing = standings[player.id!] as Standing;
    standing.matchPoints = standing.matchesWon * 3 + standing.matchesDrawn;
    const trueMatchWinPercentage =
      standing.matchPoints / (standing.matchesPlayed * 3);
    const matchWinPercentage = Math.max(trueMatchWinPercentage, minimum);
    standing.matchWinPercentage = sigFigs(100 * matchWinPercentage, 6);
    const gamePoints = standing.gamesWon * 3 + standing.gamesDrawn;
    const gamesPlayed =
      standing.gamesWon + standing.gamesLost + standing.gamesDrawn;
    const trueGameWinPercentage = gamePoints / (gamesPlayed * 3);
    const gameWinPercentage = Math.max(trueGameWinPercentage, minimum);
    standing.gameWinPercentage = sigFigs(100 * gameWinPercentage, 6);
  });
}

function getStandingsList(
  players: Player[],
  standings: Dictionary<Standing>
): Standing[] {
  return players.map((p) => standings[p.id!] as Standing);
}

function sigFigs(num: number, sigFigCount: number): number {
  const rounded = num.toPrecision(sigFigCount);
  return Number.parseFloat(rounded);
}
