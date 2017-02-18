import { Component, OnInit } from '@angular/core';

import { PairingsService } from '../shared';

@Component({
  templateUrl: './swiss.component.html'
})
export class SwissComponent implements OnInit {
  isPairingsAvailable = false;

  constructor(private pairingsService: PairingsService) {}

  ngOnInit() {
    this.pairingsService.hasBegunPairings().subscribe(hasBegunPairings => {
      this.isPairingsAvailable = hasBegunPairings;
    });
  }
}
