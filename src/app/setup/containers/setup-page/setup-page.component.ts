import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import * as fromRoot from '@mm/reducers';
import { Player } from '@mm/shared/models';
import { SetupPageActions } from '@mm/tournament/actions';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit, OnDestroy {
  @HostBinding('class.large-toolbar') largeToolbar = false;

  isMobile$: Observable<boolean>;
  players$: Observable<Player[]>;
  recommendedTotalRounds$: Observable<number>;

  private largeToolbarSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {
    this.isMobile$ = breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches));
    this.players$ = store.pipe(select(fromRoot.selectAllPlayers));
    this.recommendedTotalRounds$ = store.pipe(
      select(fromRoot.selectRecommendedTotalRounds)
    );
  }

  ngOnInit() {
    this.largeToolbarSub = this.breakpointObserver
      .observe('(min-width: 600px)')
      .subscribe((result) => {
        this.largeToolbar = result.matches;
      });
  }

  ngOnDestroy() {
    this.largeToolbarSub.unsubscribe();
  }

  onAddPlayer(player: Player) {
    this.store.dispatch(SetupPageActions.addPlayer({ player }));
  }
}
