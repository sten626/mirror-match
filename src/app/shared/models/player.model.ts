export interface Player {
  id: number;
  name: string;
  matchesPlayed?: number;
  matchesWon?: number;
  matchesDrawn?: number;
  gamesPlayed?: number;
  gamesWon?: number;
  gamesDrawn?: number;
  byes?: number;
  matchPoints?: number;
  gamePoints?: number;
  opponentMatchWinPercentage?: number;
  gameWinPercentage?: number;
  opponentGameWinPercentage?: number;
  opponentIds?: number[];
  dropped?: boolean;
}
