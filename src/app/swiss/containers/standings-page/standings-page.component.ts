import { Component } from '@angular/core';
import { Player, Standing } from '@app/shared/models';
import { Dictionary } from '@ngrx/entity';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './standings-page.component.html'
})
export class StandingsPageComponent {
  playerEntities$: Observable<Dictionary<Player>>;
  standings$: Observable<Standing[]>;

  constructor(
    // private store: Store<fromSwiss.State>
  ) {
    // this.playerEntities$ = this.store.pipe(
    //   select(fromSwiss.getPlayerEntities)
    // );
    // this.standings$ = this.store.pipe(
    //   select(fromSwiss.getStandings)
    // );
  }
}
