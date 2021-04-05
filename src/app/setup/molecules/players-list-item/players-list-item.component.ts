import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mm-players-list-item',
  templateUrl: './players-list-item.component.html',
  styleUrls: ['./players-list-item.component.scss']
})
export class PlayersListItemComponent {
  @HostBinding('class.colored')
  @Input()
  colored = false;

  constructor() {}
}
