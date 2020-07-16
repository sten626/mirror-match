import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as fromRoot from '@app/reducers';
import { Player } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent {
  isXSmallDisplay$: Observable<boolean>;
  players$: Observable<Player[]>;
  useMiniFab$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.isXSmallDisplay$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));

    this.players$ = this.store.pipe(select(fromRoot.selectAllPlayers));

    this.useMiniFab$ = this.breakpointObserver
      .observe('(max-width: 460px)') // According to https://material.io/components/buttons-floating-action-button#anatomy
      .pipe(map((result) => result.matches));
  }

  addPlayerClicked() {
    this.router.navigate(['/setup/add']);
  }
}
