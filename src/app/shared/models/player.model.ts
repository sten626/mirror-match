export class Player {
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

  // constructor(rawPlayer?: any) {
  //   this.id = rawPlayer && rawPlayer.id || null;
  //   this.name = rawPlayer && rawPlayer.name || '';
  //   this.matchesPlayed = rawPlayer && rawPlayer.matchesPlayed || 0;
  //   this.matchesWon = rawPlayer && rawPlayer.matchesWon || 0;
  //   this.matchesDrawn = rawPlayer && rawPlayer.matchesDrawn || 0;
  //   this.gamesPlayed = rawPlayer && rawPlayer.gamesPlayed || 0;
  //   this.gamesWon = rawPlayer && rawPlayer.gamesWon || 0;
  //   this.gamesDrawn = rawPlayer && rawPlayer.gamesDrawn || 0;
  //   this.byes = rawPlayer && rawPlayer.byes || 0;
  //   this.matchPoints = rawPlayer && rawPlayer.matchPoints || 0;
  //   this.gamePoints = rawPlayer && rawPlayer.gamePoints || 0;
  //   this.opponentMatchWinPercentage = rawPlayer && rawPlayer.opponentMatchWinPercentage || 0;
  //   this.gameWinPercentage = rawPlayer && rawPlayer.gameWinPercentage || 0;
  //   this.opponentGameWinPercentage = rawPlayer && rawPlayer.opponentGameWinPercentage || 0;
  //   this.opponentIds = rawPlayer && rawPlayer.opponentIds || [];
  //   this.dropped = rawPlayer && rawPlayer.dropped || false;
  // }
}
