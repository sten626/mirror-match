import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '@app/shared';

@Component({
  selector: 'mm-player-list',
  templateUrl: './player-list.component.html',
})
export class PlayerListComponent {
  @Input() hasTournamentStarted: boolean = false;
  @Input() players: Player[] = [];
  @Input() selectedPlayer: Player | null = null;
  @Output() delete = new EventEmitter<number>();
  @Output() select = new EventEmitter<Player>();

  constructor() {}
}
