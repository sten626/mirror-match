import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as fromRoot from '@mm/reducers';
import { routeAnimations } from '@mm/setup/animations';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss'],
  animations: [routeAnimations]
})
export class SetupPageComponent {
  isNextButtonEnabled$: Observable<boolean>;
  isXSmallDisplay$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {
    this.isNextButtonEnabled$ = this.store.pipe(
      select(fromRoot.selectAllPlayers),
      map((players) => players.length >= 4)
    );

    this.isXSmallDisplay$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
