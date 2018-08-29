import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Player, PlayerService } from '../shared';

@Component({
  selector: 'mm-swiss-player-list',
  templateUrl: './swiss-player-list.component.html'
})
export class SwissPlayerListComponent {
  @Input() hasBegunTournament: boolean;
  @Input() players: Player[];
  @Input() selectedPlayer: Player;
  @Output() playerSelected = new EventEmitter<Player>();

  constructor(
    private playerService: PlayerService
  ) {}

  deletePlayer(player: Player) {
    this.playerService.deletePlayer(player);
  }

  selectPlayer(player: Player) {
    this.playerSelected.emit(player);
  }
}
