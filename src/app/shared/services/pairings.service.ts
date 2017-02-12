import { Injectable } from '@angular/core';

import { PlayerService } from './player.service';

@Injectable()
export class PairingsService {
  constructor(private playerService: PlayerService) {}

  canBeginPairings(): boolean {
    return this.playerService.numPlayers >= 4;
  }
}
