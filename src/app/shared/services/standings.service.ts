import { Injectable } from '@angular/core';

import { PairingService } from './pairing.service';
import { PlayerService } from './player.service';
import { Pairing, Player } from '../';

@Injectable()
export class StandingsService {
  private pairings: Pairing[];
  private players: Player[];

  constructor(
    private pairingService: PairingService,
    private playerService: PlayerService
  ) {
    this.playerService.players.subscribe((players: Player[]) => this.players = players);
    this.pairingService.submittedPairings.subscribe((pairings: Pairing[]) => {
      this.pairings = pairings;
      // TODO: Calculate standings
    });
  }
}
