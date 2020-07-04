import { Component, HostBinding, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export type FabPosition = 'center' | 'right' | undefined;

@Component({
  selector: 'mm-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent {
  @Input() color: ThemePalette;
  @Input() position: FabPosition = 'right';

  constructor() {}

  @HostBinding('class.centered') centered(): boolean {
    return this.position === 'center';
  }
}
