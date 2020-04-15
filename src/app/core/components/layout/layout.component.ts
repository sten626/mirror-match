import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromRoot from '@app/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit {
  showSidenav$: Observable<boolean>;
  sidenavMode$: Observable<string>;
  toolbarHeader = '';

  private breakpointState$: Observable<BreakpointState>;
  private urlSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {
    this.breakpointState$ = this.breakpointObserver.observe(Breakpoints.Handset);

    this.showSidenav$ = this.breakpointState$.pipe(
      map(state => !state.matches)
    );
    this.sidenavMode$ = this.breakpointState$.pipe(
      map(state => state.matches ? 'over' : 'side')
    );
  }

  ngOnInit() {
    this.urlSubscription = this.store.select(fromRoot.getUrl).subscribe(route => {
      if (route && route.includes('/')) {
        const routeSection = route.split('/')[1];
        this.toolbarHeader = routeSection[0].toUpperCase() + routeSection.slice(1);
      } else {
        this.toolbarHeader = '';
      }
    });
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
  }
}
