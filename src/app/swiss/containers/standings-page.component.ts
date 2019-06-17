import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StandingsService, Standing } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './standings-page.component.html'
})
export class StandingsPageComponent implements OnInit {
  standings$: Observable<Standing[]>;

  constructor(
    private standingsService: StandingsService,
    private store: Store<fromSwiss.State>
  ) {
    this.standings$ = this.store.pipe(
      select(fromSwiss.getAllSubmittedPairings),
      switchMap(pairings => this.standingsService.calculateStandings(pairings))
    );
  }

  ngOnInit() {
    // this.standings = this.standingsService.standings$;
  }
}
