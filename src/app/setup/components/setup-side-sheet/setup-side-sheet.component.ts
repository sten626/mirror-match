import { Component, HostBinding, Input } from '@angular/core';

export type SideSheetMode = 'standard' | 'modal';

@Component({
  selector: 'mm-setup-side-sheet',
  templateUrl: './setup-side-sheet.component.html',
  styleUrls: ['./setup-side-sheet.component.scss']
})
export class SetupSideSheetComponent {
  @Input() mode: SideSheetMode = 'modal';
  @Input() opened = false;
  @Input() recommendedTotalRounds: number;

  constructor() {}

  @HostBinding('class.mm-side-sheet--modal') get modal() {
    return this.mode === 'modal';
  }

  open() {
    this.toggle(true);
  }

  toggle(isOpen = !this.opened) {
    this.opened = isOpen;
  }
}
