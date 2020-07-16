import {
  animate,
  query,
  style,
  transition,
  trigger,
  group,
  animateChild
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
        'border-radius': '8px',
        transform: 'scale(0)',
        'transform-origin': 'bottom',
        bottom: '64px',
        opacity: 0
      })
    ]),
    group([
      query(':leave', animateChild()),
      query(':leave', [
        animate('5s ease-out', style({
          opacity: 0
        }))
      ]),
      query(':enter', [
        animate(
          '5s ease-out',
          style({
            'border-radius': 0,
            transform: 'scale(1)',
            bottom: 0,
            opacity: 1
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
