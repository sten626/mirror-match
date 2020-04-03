import { Component } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Player, Standing } from '@app/shared';
import * as fromSwiss from '@app/swiss/reducers';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './standings-page.component.html'
})
export class StandingsPageComponent {
  playerEntities$: Observable<Dictionary<Player>>;
  standings$: Observable<Standing[]>;

  constructor(
    private store: Store<fromSwiss.State>
  ) {
    this.playerEntities$ = this.store.pipe(
      select(fromSwiss.getPlayerEntities)
    );
    this.standings$ = this.store.pipe(
      select(fromSwiss.getStandings)
    );
  }
}
