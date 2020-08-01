import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { PodListData } from '@mm/shared/models';
import { PodsPageActions } from '@mm/tournament/actions';
import * as fromTournament from '@mm/tournament/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-pods-page',
  templateUrl: './pods-page.component.html',
  styleUrls: ['./pods-page.component.scss']
})
export class PodsPageComponent implements OnInit {
  isHandset$: Observable<boolean>;
  pods$: Observable<PodListData[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromTournament.State>
  ) {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches));
    this.pods$ = this.store.pipe(select(fromTournament.selectPodListData));
  }

  ngOnInit(): void {
    this.store.dispatch(PodsPageActions.enter());
  }
}
