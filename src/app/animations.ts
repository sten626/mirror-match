import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('SetupPage => PodsPage', [
    style({
      position: 'relative'
    }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '100%' })]),
    group([
      // query('@testAnimation', animateChild()),
      query(':leave', [animate('300ms ease-out', style({ left: '-100%' }))]),
      query(':enter', [animate('300ms ease-out', style({ left: '0' }))])
    ])
    // query(':enter', animateChild())
  ]),
  transition('PodsPage => SetupPage', [
    style({
      position: 'relative'
    }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '-100%' })]),
    group([
      query('@testAnimation', animateChild()),
      query(':leave', [animate('5s ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('5s ease-out', style({ left: '0' }))])
    ])
    // query(':enter', animateChild())
  ])
]);
