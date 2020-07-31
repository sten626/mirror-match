import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

const ENTER_TIMING = '250ms';
const LEAVE_TIMING = '200ms';
const STANDARD_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const bottomSheetAnimations = [
  trigger('state', [
    transition('* => showing', [
      query('.content', style({ transform: 'translateY(100%)' })),
      query('.scrim', style({ opacity: 0 })),
      group([
        query(
          '.content',
          animate(
            `${ENTER_TIMING} ${STANDARD_EASING}`,
            style({ transform: 'translateY(0%)' })
          )
        ),
        query(
          '.scrim',
          animate(`${ENTER_TIMING} ${STANDARD_EASING}`, style({ opacity: 1 }))
        )
      ])
    ]),
    transition('* => hidden', [
      query('.content', style({ transform: 'translateY(0%)' })),
      query('.scrim', style({ opacity: 1 })),
      group([
        query(
          '.content',
          animate(
            `${LEAVE_TIMING} ${STANDARD_EASING}`,
            style({ transform: 'translateY(100%)' })
          )
        ),
        query(
          '.scrim',
          animate(`${LEAVE_TIMING} ${STANDARD_EASING}`, style({ opacity: 0 }))
        )
      ])
    ])
  ])
];
