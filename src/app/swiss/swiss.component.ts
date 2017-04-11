import { Component, OnInit } from '@angular/core';

import { PairingService } from '../shared';

@Component({
  templateUrl: './swiss.component.html'
})
export class SwissComponent implements OnInit {
  isPairingsAvailable = false;

  constructor(private pairingService: PairingService) {}

  ngOnInit() {
    this.pairingService.hasBegunPairings().subscribe(hasBegunPairings => {
      this.isPairingsAvailable = hasBegunPairings;
    });
  }
}
