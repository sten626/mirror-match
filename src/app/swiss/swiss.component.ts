import { Component } from '@angular/core';

import { PairingsService } from '../shared';

@Component({
  templateUrl: './swiss.component.html'
})
export class SwissComponent {
  constructor(private pairingsService: PairingsService) {}

  isPairingsClickable(): boolean {
    return this.pairingsService.hasBegunPairings;
  }
}
