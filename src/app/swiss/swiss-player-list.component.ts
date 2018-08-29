import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Player } from '../shared';

@Component({
  selector: 'mm-swiss-player-list',
  templateUrl: './swiss-player-list.component.html'
})
export class SwissPlayerListComponent {
  @Input() hasBegunTournament: boolean;
  @Input() players: Player[];
  @Input() selectedPlayer: Player;
  @Output() playerDeleted = new EventEmitter<Player>();
  @Output() playerSelected = new EventEmitter<Player>();

  constructor() {}

  deletePlayer(player: Player) {
    this.playerDeleted.emit(player);
  }

  selectPlayer(player: Player) {
    this.playerSelected.emit(player);
  }
}
