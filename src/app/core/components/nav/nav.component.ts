import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @HostBinding('class.rail')
  @Input()
  railMode = true;

  constructor() {}
}
