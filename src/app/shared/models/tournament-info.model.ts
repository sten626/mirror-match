interface TournamentInfoInterface {
  currentRound: number;
  numberOfRounds: number;
}

export type TournamentInfo = Readonly<TournamentInfoInterface>;
