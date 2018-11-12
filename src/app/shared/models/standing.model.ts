export class Standing {
  constructor(
    public playerName: string,
    public matchPoints: number,
    public matchesPlayed: number,
    public matchesWon: number,
    public matchesDrawn: number,
    public byes: number,
    public opponentMatchWinPercentage: number,
    public gameWinPercentage: number,
    public opponentGameWinPercentage
  ) {}
}
