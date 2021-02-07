import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

const animations = [
  trigger('showHide', [
    state(
      'hidden',
      style({
        display: 'none'
      })
    ),
    transition('hidden => shown', [
      style({
        display: 'block',
        transform: 'translateY(100%)'
      }),
      animate('250ms')
    ]),
    transition('shown => hidden', [
      style({ transform: 'translateY(0)' }),
      animate('200ms', style({ transform: 'translateY(100%)' }))
    ])
  ])
];

@Component({
  selector: 'mm-setup-footer',
  animations: animations,
  templateUrl: './setup-footer.component.html',
  styleUrls: ['./setup-footer.component.scss']
})
export class SetupFooterComponent {
  @Input() isHidden = false;
  @Output() add = new EventEmitter();
  @Output() deleteAll = new EventEmitter();

  constructor() {}

  addClicked() {
    this.add.emit();
  }

  deleteAllClicked() {
    this.deleteAll.emit();
  }
}
