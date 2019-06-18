export class PlayerMatchData {
  playerId: number;
  opponentIds = new Set<number>();
  matchesPlayed = 0;
  matchesWon = 0;
  matchesLost = 0;
  matchesDrawn = 0;
  byes = 0;
  gamesPlayed = 0;
  gamesWon = 0;
  gamesLost = 0;
  gamesDrawn = 0;

  constructor(playerId: number) {
    this.playerId = playerId;
  }
}
