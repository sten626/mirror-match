import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Player, StandingsService } from '../shared';

@Component({
  templateUrl: './swiss-standings.component.html'
})
export class SwissStandingsComponent implements OnInit {
  standings: Observable<Player[]>;

  constructor(private standingsService: StandingsService) {}

  ngOnInit() {
    this.standings = this.standingsService.standings$;
  }
}
