interface PairingInterface {
  round: number;
  table: number;
  player1Id: number;
  player2Id: number;
  player1Wins: number;
  player2Wins: number;
  draws: number;
  submitted: boolean;
}

export type Pairing = Readonly<PairingInterface>;

// export class Pairing {
//   bye = false;

//   constructor(
//     public round: number,
//     public table: number,
//     public player1: Player,
//     public player2: Player,
//     public player1Wins = 0,
//     public player2Wins = 0,
//     public draws = 0,
//     public submitted = false
//   ) {
//     if (!player2) {
//       this.bye = true;
//       this.player1Wins = 2;
//       this.submitted = true;
//     }
//   }
// }
