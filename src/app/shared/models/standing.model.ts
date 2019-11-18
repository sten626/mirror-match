export interface Standing {
  playerId: number;
  opponentIds: number[];
  matchesPlayed: number;
  matchesWon: number;
  matchesDrawn: number;
  byes: number;
  gamesWon: number;
  gamesLost: number;
  gamesDrawn: number;
  matchPoints: number;
  matchWinPercentage: number;
  opponentMatchWinPercentage: number;
  gameWinPercentage: number;
  opponentGameWinPercentage: number;
}

export const standingDefaults = {
  matchesPlayed: 0,
  matchesWon: 0,
  matchesDrawn: 0,
  byes: 0,
  gamesWon: 0,
  gamesLost: 0,
  gamesDrawn: 0,
  matchPoints: 0,
  matchWinPercentage: 0,
  opponentMatchWinPercentage: 0,
  gameWinPercentage: 0,
  opponentGameWinPercentage: 0
};
