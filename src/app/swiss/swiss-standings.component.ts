import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Standing, StandingsService } from '../shared';

@Component({
  templateUrl: './swiss-standings.component.html'
})
export class SwissStandingsComponent implements OnInit {
  standings: Observable<Standing[]>;

  constructor(private standingsService: StandingsService) {}

  ngOnInit() {
    this.standings = this.standingsService.standings$;
  }
}
