import { Injectable } from '@angular/core';

import { PlayerService } from './player.service';

@Injectable()
export class PairingsService {
  private _hasBegunPairings: boolean;
  private _roundsTotal: number;

  readonly lsKeys = {
    hasBegunPairings: 'hasBegunPairings',
    roundsTotal: 'roundsTotal'
  };

  constructor(private playerService: PlayerService) {}

  canBeginPairings(): boolean {
    return this.playerService.numPlayers >= 4;
  }

  get hasBegunPairings(): boolean {
    if (this._hasBegunPairings === undefined) {
      const hasBegunPairingsData = localStorage.getItem(this.lsKeys.hasBegunPairings);

      if (hasBegunPairingsData) {
        this._hasBegunPairings = JSON.parse(hasBegunPairingsData);
      } else {
        this._hasBegunPairings = false;
        localStorage.setItem(this.lsKeys.hasBegunPairings, JSON.stringify(this._hasBegunPairings));
      }
    }

    return this._hasBegunPairings;
  }

  set hasBegunPairings(hasBegun: boolean) {
    this._hasBegunPairings = hasBegun;
    localStorage.setItem(this.lsKeys.hasBegunPairings, JSON.stringify(this._hasBegunPairings));
  }

  get roundsTotal(): number {
    if (!this._roundsTotal) {
      const roundsTotalData = localStorage.getItem(this.lsKeys.roundsTotal);

      if (roundsTotalData) {
        this._roundsTotal = JSON.parse(roundsTotalData);
      } else {
        this._roundsTotal = null;
      }
    }

    return this._roundsTotal;
  }

  set roundsTotal(numRounds: number) {
    this._roundsTotal = numRounds;
    localStorage.setItem(this.lsKeys.roundsTotal, JSON.stringify(this._roundsTotal));
  }
}
