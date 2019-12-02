import { Component, Input } from '@angular/core';
import { Player } from '@app/shared/models';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html'
})
export class PlayersListComponent {
  @Input() players: Player[];

  constructor() {}
}
