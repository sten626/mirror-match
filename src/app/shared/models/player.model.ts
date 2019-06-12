interface PlayerInterface {
  id?: number;
  name: string;
  matchesPlayed?: number;
  matchesWon?: number;
  matchesDrawn?: number;
  gamesPlayed?: number;
  gamesWon?: number;
  gamesDrawn?: number;
  byes?: number;
  opponentIds?: number[];
  dropped?: boolean;
}

export type Player = Readonly<PlayerInterface>;

export const playerDefaults = {
  matchesPlayed: 0,
  matchesWon: 0,
  matchesDrawn: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  gamesDrawn: 0,
  byes: 0,
  opponentIds: [],
  dropped: false
};
