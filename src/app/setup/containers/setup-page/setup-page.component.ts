import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromRoot from '@mm/reducers';
import { Player } from '@mm/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit, OnDestroy {
  breakpointSub: Subscription;
  players$: Observable<Player[]>;
  recommendedTotalRounds$: Observable<number>;
  sheetFixed = true;
  sheetMode = 'over';
  sheetOpened = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    store: Store<fromRoot.State>
  ) {
    this.players$ = store.pipe(select(fromRoot.selectAllPlayers));
    this.recommendedTotalRounds$ = store.pipe(
      select(fromRoot.selectRecommendedTotalRounds)
    );
  }

  ngOnInit() {
    this.breakpointSub = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.sheetFixed = true;
          this.sheetMode = 'over';
          this.sheetOpened = false;
        } else {
          this.sheetFixed = false;
          this.sheetMode = 'side';
          this.sheetOpened = true;
        }
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}
