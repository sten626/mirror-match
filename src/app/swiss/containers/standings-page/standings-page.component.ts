import { Component } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Player, Standing, StandingsService } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './standings-page.component.html'
})
export class StandingsPageComponent {
  playerEntities$: Observable<Dictionary<Player>>;
  standings$: Observable<Standing[]>;

  constructor(
    private standingsService: StandingsService,
    private store: Store<fromSwiss.State>
  ) {
    this.playerEntities$ = this.store.pipe(
      select(fromSwiss.getPlayerEntities)
    );
    const players$ = this.store.pipe(
      select(fromSwiss.getAllPlayers)
    );
    const pairings$ = this.store.pipe(
      select(fromSwiss.getAllSubmittedPairings)
    );
    this.standings$ = combineLatest(players$, pairings$).pipe(
      switchMap(([players, pairings]) => this.standingsService.calculateStandings(pairings, players))
    );
  }
}
