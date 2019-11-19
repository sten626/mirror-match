import { Standing } from './models';

export function standingsMatchPointComparator(a: Standing, b: Standing): number {
  return b.matchPoints - a.matchPoints;
}

export function standingsTiebreakerComparator(a: Standing, b: Standing): number {
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
}
