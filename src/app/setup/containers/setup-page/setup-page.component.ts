import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
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
        transform: 'scale(0)',
        'transform-origin': 'bottom',
        bottom: '64px',
        opacity: 0
      }),
    ]),
    group([
      query(':leave', [animateChild()]),
      query(':enter', [
        group([
          animate(
            '60ms 60ms',
            style({
              opacity: 1
            })
          ),
          animate(
            '300ms ease-out',
            style({
              transform: 'scale(1)',
              bottom: 0
            })
          )
        ])
      ])
    ])
  ]),
  transition('AddPlayer => PlayersPage', [
    style({
      position: 'relative'
    }),
    query(':leave', [
      style({
        opacity: 1,
        bottom: 0,
        transform: 'scale(1)',
        'transform-origin': 'bottom'
      })
    ]),
    group([
      query(':leave', [
        group([
          animate('67ms 50ms', style({
            opacity: 0
          })),
          animate('250ms ease-out', style({
            bottom: '64px',
            transform: 'scale(0)'
          }))
        ])
      ]),
      query(':enter', [animateChild()])
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
