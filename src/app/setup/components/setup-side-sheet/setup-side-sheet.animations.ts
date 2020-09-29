import { animate, style, transition, trigger } from '@angular/animations';

const IN_TIME = '250ms';
const OUT_TIME = '200ms';
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const animations = [
  trigger('openClose', [
    transition('close => open', [
      style({
        display: 'block',
        transform: 'translateX(100%)'
      }),
      animate(
        `${IN_TIME} ${EASING}`,
        style({
          transform: 'translateX(0)'
        })
      )
    ]),
    transition('open => close', [
      style({
        display: 'block'
      }),
      animate(
        `${OUT_TIME} ${EASING}`,
        style({
          transform: 'translateX(100%)'
        })
      )
    ])
  ]),
  trigger('showHideScrim', [
    transition('hide => show', [
      style({
        display: 'block',
        opacity: 0
      }),
      animate(
        `${IN_TIME} ${EASING}`,
        style({
          opacity: 1
        })
      )
    ]),
    transition('show => hide', [
      style({
        display: 'block'
      }),
      animate(
        `${OUT_TIME} ${EASING}`,
        style({
          opacity: 0
        })
      )
    ])
  ])
];
