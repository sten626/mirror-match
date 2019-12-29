import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { Subscription, Observable } from 'rxjs';
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

  private urlSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {
    this.showSidenav$ = this.store.select(fromRoot.selectShowSidenav);
    this.sidenavMode$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(state => state.matches ? 'over' : 'side')
    );
  }

  ngOnInit() {
    this.urlSubscription = this.store.select(fromRoot.selectUrl).subscribe(route => {
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

  onToggleSidenav() {
    console.log('tada!');
  }
}
