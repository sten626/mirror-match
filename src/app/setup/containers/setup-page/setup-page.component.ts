import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as fromRoot from '@mm/reducers';
import { routeAnimations } from '@mm/setup/animations';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss'],
  animations: [routeAnimations]
})
export class SetupPageComponent implements OnInit, OnDestroy {
  @HostBinding('class.large-toolbar') hasLargeToolbar = false;

  breakpointSub: Subscription;
  isNextButtonEnabled$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {
    this.isNextButtonEnabled$ = this.store.pipe(
      select(fromRoot.selectAllPlayers),
      map((players) => players.length >= 4)
    );
  }

  ngOnInit() {
    this.breakpointSub = this.breakpointObserver
      .observe('(min-width: 600px)')
      .subscribe((result) => {
        this.hasLargeToolbar = result.matches;
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
