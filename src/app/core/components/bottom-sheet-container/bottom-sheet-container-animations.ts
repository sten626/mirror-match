import { state, style, trigger, transition, animate } from '@angular/animations';

const enterTiming = '250ms';
// const leaveTiming = '200ms';
const standardEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const bottomSheetContainer = [
  trigger('bottomSheetContainer', [
    state('void, exit', style({ transform: 'translateY(100%)' })),
    state('enter', style({ transform: 'none' })),
    transition('* => enter', animate(`${enterTiming} ${standardEasing}`))
    // transition(':enter', animate(`${enterTiming} ${standardEasing}`))
  ])
];
