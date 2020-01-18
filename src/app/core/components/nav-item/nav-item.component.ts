import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() routerLink: string | any[] = '';

  constructor() {}
}
