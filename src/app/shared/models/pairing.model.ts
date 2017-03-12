import { Player } from './player.model';

export class Pairing {
  table: number;
  player1: Player;
  player2: Player;
  player1Wins: number;
  player2Wins: number;
  draws: number;
}
