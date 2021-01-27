import { Component, Input } from '@angular/core';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input() players: Player[];

  constructor() {}
}
