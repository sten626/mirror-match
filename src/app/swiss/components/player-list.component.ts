import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Player } from '../../shared';

@Component({
  selector: 'mm-swiss-player-list',
  templateUrl: './player-list.component.html'
})
export class PlayerListComponent {
  @Input() hasBegunTournament: boolean;
  @Input() players: Player[];
  @Input() selectedPlayer: Player;
  @Output() playerDeleted = new EventEmitter<Player>();
  @Output() playerSelected = new EventEmitter<Player>();

  constructor() {}

  /**
   * Emit an event that a Player needs to be deleted.
   * @param player The Player being deleted from the list.
   */
  deletePlayer(player: Player) {
    this.playerDeleted.emit(player);
  }

  /**
   * Emit an event that a Player has been selected.
   * @param player The Player being selected from the list.
   */
  selectPlayer(player: Player) {
    this.playerSelected.emit(player);
  }
}
