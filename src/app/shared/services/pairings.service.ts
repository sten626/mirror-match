import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';

import { PlayerService } from './player.service';

@Injectable()
export class PairingsService {
  private begunPairings: boolean;
  private begunPairingsSubject = new BehaviorSubject<boolean>(false);
  private _roundsTotal: number;

  private readonly lsKeys = {
    hasBegunPairings: 'hasBegunPairings',
    roundsTotal: 'roundsTotal'
  };

  constructor(private playerService: PlayerService) {}

  beginPairings() {
    this.begunPairings = true;
    localStorage.setItem(this.lsKeys.hasBegunPairings, JSON.stringify(this.begunPairings));
    this.begunPairingsSubject.next(this.begunPairings);
  }

  canBeginPairings(): boolean {
    return this.playerService.numPlayers >= 4;
  }

  hasBegunPairings(): Observable<boolean> {
    if (this.begunPairings === undefined) {
      const hasBegunPairingsData = localStorage.getItem(this.lsKeys.hasBegunPairings);

      if (hasBegunPairingsData) {
        this.begunPairings = JSON.parse(hasBegunPairingsData);
      } else {
        this.begunPairings = false;
        localStorage.setItem(this.lsKeys.hasBegunPairings, JSON.stringify(this.begunPairings));
      }
    }

    this.begunPairingsSubject.next(this.begunPairings);

    return this.begunPairingsSubject.asObservable().distinctUntilChanged();
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
