interface PlayerInterface {
  id?: string;
  name: string;
  matchesPlayed?: number;
  matchesWon?: number;
  matchesDrawn?: number;
  gamesPlayed?: number;
  gamesWon?: number;
  gamesDrawn?: number;
  byes?: number;
  opponentIds?: Set<string>;
  dropped?: boolean;
}

export type Player = Readonly<PlayerInterface>;
