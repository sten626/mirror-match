// export class Standing {
//   constructor(
//     public playerName: string,
//     public matchesPlayed: number,
//     public matchesWon: number,
//     public matchesDrawn: number,
//     public byes: number,
//     public opponentMatchWinPercentage: number,
//     public gameWinPercentage: number,
//     public opponentGameWinPercentage: number
//   ) {}
// }

export interface Standing {
  playerId: number;
  opponentIds: number[];
  matchesWon: number;
  matchesLost: number;
  matchesDrawn: number;
  byes: number;
  gamesWon: number;
  gamesLost: number;
  gamesDrawn: number;
}
