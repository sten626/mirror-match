import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Player } from '../../shared';

@Component({
  selector: 'mm-player-list',
  templateUrl: './player-list.component.html'
})
export class PlayerListComponent {
  @Input() hasTournamentStarted: boolean;
  @Input() players: Player[];
  @Input() selectedPlayer: Player;
  @Output() delete = new EventEmitter<Player>();
  @Output() select = new EventEmitter<Player>();

  constructor() {}
}
