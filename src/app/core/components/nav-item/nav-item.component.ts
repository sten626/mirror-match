import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-nav-item',
  templateUrl: './nav-item.component.html'
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() routerLink: string | any[] = '';

  constructor() {}
}
