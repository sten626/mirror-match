import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from '@angular/animations';

export const playerListAnimations = [
  trigger('listItem', [
    transition('void => new', [
      style({
        height: 0,
        opacity: 0
      }),
      sequence([
        animate(
          '250ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({
            height: '*'
          })
        ),
        animate(
          '100ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({
            opacity: 1
          })
        )
      ])
    ])
  ])
];
