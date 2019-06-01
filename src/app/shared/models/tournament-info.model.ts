interface TournamentInfoInterface {
  currentRound: number;
  numberOfRounds: number;
  selectedRound: number;
}

export type TournamentInfo = Readonly<TournamentInfoInterface>;
