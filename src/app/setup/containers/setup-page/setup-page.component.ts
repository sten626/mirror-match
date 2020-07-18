import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as fromRoot from '@app/reducers';
import { routeAnimations } from '@app/setup/animations';
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

  constructor(private store: Store<fromRoot.State>) {
    this.isNextButtonEnabled$ = this.store.pipe(
      select(fromRoot.selectAllPlayers),
      map((players) => players.length >= 4)
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
