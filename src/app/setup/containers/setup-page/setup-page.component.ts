import { Component } from '@angular/core';
import * as fromRoot from '@mm/reducers';
import { Player } from '@mm/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent {
  isMobile$: Observable<boolean>;
  players$: Observable<Player[]>;
  recommendedTotalRounds$: Observable<number>;

  constructor(store: Store<fromRoot.State>) {
    this.players$ = store.pipe(select(fromRoot.selectAllPlayers));
    this.recommendedTotalRounds$ = store.pipe(
      select(fromRoot.selectRecommendedTotalRounds)
    );
  }
}
