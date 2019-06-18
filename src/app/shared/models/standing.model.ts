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
  playerName: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesDrawn: number;
  byes: number;
  matchPoints: number;
  opponentMatchWinPercentage: number;
  gameWinPercentage: number;
  opponentGameWinPercentage: number;
}
