import {
  animate,
  query,
  style,
  transition,
  trigger,
  group
} from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as fromRoot from '@app/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const animations = trigger('routeAnimations', [
  transition('PlayersPage => AddPlayer', [
    style({
      position: 'relative'
    }),
    query(':enter', [
      style({
        position: 'absolute',
        top: 'unset',
        right: '60px',
        bottom: '60px',
        left: 'unset'
      })
    ]),
    group([
      query(':leave', [
        animate('5s ease-out', style({
          opacity: 0
        }))
      ]),
      query(':enter', [
        animate(
          '5s ease-out',
          style({
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          })
        )
      ])
    ])
  ])
]);

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss'],
  animations: [animations]
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
