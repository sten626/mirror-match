import { Component, HostBinding, Input } from '@angular/core';
// import { ThemePalette } from '@angular/material/core';

export type FabPosition =
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | undefined;

@Component({
  selector: 'mm-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent {
  // @Input() color: ThemePalette;
  @Input() position: FabPosition = 'bottom-right';

  constructor() {}

  @HostBinding('class.bottom-center') get bottomCenter(): boolean {
    return this.position === 'bottom-center';
  }

  @HostBinding('class.top-left') get topLeft(): boolean {
    return this.position === 'top-left';
  }
}
