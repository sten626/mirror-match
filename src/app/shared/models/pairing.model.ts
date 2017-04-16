import { Player } from './player.model';

export class Pairing {
  constructor(
    public round: number,
    public table: number,
    public player1: Player,
    public player2: Player,
    public player1Wins = 0,
    public player2Wins = 0,
    public draws = 0,
    public submitted = false
  ) {}
}
