import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

const enterTiming = '250ms';
const leaveTiming = '200ms';
const standardEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';
const animations = [
  trigger('sheetContainer', [
    transition(':enter', [
      query('main', style({ transform: 'translateY(100%)' })),
      query('.scrim', style({ opacity: 0 })),
      group([
        query(
          'main',
          animate(
            `${enterTiming} ${standardEasing}`,
            style({ transform: 'translateY(0)' })
          )
        ),
        query('.scrim', animate(`${enterTiming}`, style({ opacity: 1 })))
      ])
    ]),
    transition(':leave', [
      query('main', style({ transform: 'translateY(0)' })),
      query('.scrim', style({ opacity: 1 })),
      group([
        query(
          'main',
          animate(
            `${leaveTiming} ${standardEasing}`,
            style({ transform: 'translateY(100%)' })
          )
        ),
        query('.scrim', animate(`${leaveTiming}`, style({ opacity: 0 })))
      ])
    ])
  ])
];

@Component({
  selector: 'mm-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  animations: animations
})
export class BottomSheetComponent {
  @Input() show = false;
  @Output() close = new EventEmitter();

  constructor() {}
}
