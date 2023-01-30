interface PairingInterface {
  id: number;
  table: number;
  player1Id: number;
  player2Id: number | null;
  player1Wins: number;
  player2Wins: number;
  draws: number;
  submitted: boolean;
}

export type Pairing = Readonly<PairingInterface>;
