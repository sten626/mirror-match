interface PairingInterface {
  id: number;
  table: number;
  player1Id: number;
  player2Id: number;
  player1Wins: number;
  player2Wins: number;
  draws: number;
  submitted: boolean;
}

export type Pairing = Readonly<PairingInterface>;
