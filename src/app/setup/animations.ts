import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('PlayersPage => AddPlayer', [
    query(':enter', [
      style({
        opacity: 0,
        transform: 'scale(0.8)'
      })
    ]),
    query(':leave', [
      style({
        opacity: 1,
        transform: 'scale(1)'
      })
    ]),
    group([
      query(':enter', [
        group([
          animate(
            '210ms 90ms cubic-bezier(0.8, 0, 1, 1)',
            style({
              opacity: 1
            })
          ),
          animate(
            '300ms cubic-bezier(0.8, 0, 1, 1)',
            style({
              transform: 'scale(1)'
            })
          )
        ])
      ]),
      query(':leave', [
        group([
          animate(
            '90ms cubic-bezier(0.4, 0, 1, 1)',
            style({
              opacity: 0
            })
          ),
          animate(
            '300ms cubic-bezier(0.4, 0, 1, 1)',
            style({
              transform: 'scale(1.1)'
            })
          )
        ])
      ])
    ])
  ]),
  transition('AddPlayer => PlayersPage', [
    query(':enter', [
      style({
        opacity: 0,
        transform: 'scale(1.1)'
      })
    ]),
    query(':leave', [
      style({
        opacity: 1,
        transform: 'scale(1)'
      })
    ]),
    group([
      query(':enter', [
        group([
          animate(
            '90ms cubic-bezier(0.8, 0, 1, 1)',
            style({
              opacity: 1
            })
          ),
          animate(
            '300ms cubic-bezier(0.8, 0, 1, 1)',
            style({
              transform: 'scale(1)'
            })
          )
        ])
      ]),
      query(':leave', [
        group([
          animate(
            '210ms 90ms cubic-bezier(0.4, 0, 1, 1)',
            style({
              opacity: 0
            })
          ),
          animate(
            '300ms cubic-bezier(0.4, 0, 1, 1)',
            style({
              transform: 'scale(0.8)'
            })
          )
        ])
      ])
    ])
  ])
]);
